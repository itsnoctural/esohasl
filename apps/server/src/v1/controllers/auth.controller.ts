import { generateCodeVerifier, generateState } from "arctic";
import { Elysia, error, t } from "elysia";
import { github, google, lucia } from "../lib/lucia";
import { auth } from "../plugins/auth";
import * as AuthService from "../services/auth.service";
import * as AWSS3Service from "../services/aws-s3.service";
import * as UsersService from "../services/users.serivce";

export const AuthController = new Elysia({ prefix: "/auth" })
  .group("/link", (app) =>
    app
      .get("/github", async ({ cookie, redirect }) => {
        const state = generateState();
        const url = github.createAuthorizationURL(state, []);

        cookie.github_state.set({
          value: state,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return redirect(url.href);
      })
      .get("/google", async ({ cookie, redirect }) => {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        const url = google.createAuthorizationURL(state, codeVerifier, [
          "profile",
        ]);

        cookie.google_state.set({
          value: state,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        cookie.code_verifier.set({
          value: codeVerifier,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return redirect(url.href);
      }),
  )
  .guard(
    {
      query: t.Object({
        code: t.String(),
        state: t.String(),
      }),
      cookie: t.Partial(
        t.Cookie({
          github_state: t.String(),
          google_state: t.String(),
          code_verifier: t.String(),
        }),
      ),
    },
    (app) =>
      app
        .get("/github", async ({ cookie, query, redirect }) => {
          if (cookie.github_state.value !== query.state)
            throw error(400, "Incorrect state.");

          const tokens = await github.validateAuthorizationCode(query.code);
          const { id, login, avatar_url } = await AuthService.getUserGithub(
            tokens.accessToken(),
          );

          const user = await UsersService.findOrCreate(
            `${id}`,
            "github",
            login,
          );
          AWSS3Service.uploadWithUrl(avatar_url, `avatars/${user.id}`);

          const session = await lucia.createSession(user.id, {});
          const sessionCookie = lucia.createSessionCookie(session.id);

          cookie[sessionCookie.name].set({
            value: sessionCookie.value,
            ...sessionCookie.attributes,
          });

          return redirect(Bun.env.HOME_URL);
        })
        .get("/google", async ({ cookie, query, redirect }) => {
          if (
            !cookie.code_verifier.value ||
            cookie.google_state.value !== query.state
          )
            throw error(400, "Incorrect state.");

          const tokens = await google.validateAuthorizationCode(
            query.code,
            cookie.code_verifier.value,
          );

          const { sub, name, picture } = await AuthService.getUserGoogle(
            tokens.accessToken(),
          );

          const user = await UsersService.findOrCreate(
            `${sub}`,
            "google",
            name,
          );
          AWSS3Service.uploadWithUrl(picture, `avatars/${user.id}`);

          const session = await lucia.createSession(user.id, {});
          const sessionCookie = lucia.createSessionCookie(session.id);

          cookie[sessionCookie.name].set({
            value: sessionCookie.value,
            ...sessionCookie.attributes,
          });

          return redirect(Bun.env.HOME_URL);
        }),
  )
  .guard((app) =>
    app.use(auth).get("/logout", async ({ session, redirect, cookie }) => {
      await lucia.invalidateSession(session.id);

      const sessionCookie = lucia.createBlankSessionCookie();
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      return redirect(Bun.env.HOME_URL);
    }),
  );
