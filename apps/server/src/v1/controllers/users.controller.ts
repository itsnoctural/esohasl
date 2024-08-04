import { Elysia, t } from "elysia";
import { auth } from "../plugins/auth";
import * as UsersService from "../services/users.serivce";

export const UsersController = new Elysia({ prefix: "/users" })
  .group("/@me", (app) =>
    app
      .use(auth)
      .get("/", ({ user: { id, username, createdAt } }) => {
        return { id, username, createdAt };
      })
      .patch(
        "/",
        ({ user, body }) =>
          UsersService.updateUsername(
            user.id,
            user.updatedNameAt,
            body.username,
          ),
        {
          body: t.Object({
            username: t.String(),
          }),
        },
      ),
  )
  .get(
    "/:username",
    async ({ params, error }) => {
      const user = await UsersService.findByName(params.username);

      if (!user) return error(404);

      return user;
    },
    {
      params: t.Object({
        username: t.String(),
      }),
    },
  );
