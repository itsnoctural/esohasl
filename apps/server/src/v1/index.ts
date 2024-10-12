import { Elysia } from "elysia";
import { AccessController } from "./controllers/access.controller";
import { AuthController } from "./controllers/auth.controller";
import { ScriptsController } from "./controllers/scripts.controller";
import { UsersController } from "./controllers/users.controller";

export const api = new Elysia({ prefix: "/v1" })
  .use(AuthController)
  .use(UsersController)
  .use(ScriptsController)
  .use(AccessController)
