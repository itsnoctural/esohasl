import { Elysia, t } from "elysia";

const base = t.Object({
  title: t.String({ minLength: 6, maxLength: 85 }),
  game: t.Optional(t.String()),
  description: t.Optional(t.String({ maxLength: 1000 })),
  script: t.String({ maxLength: 2500 }),
});

const thumbnail = t.File({
  type: ["image/png", "image/jpeg", "image/webp", "image/avif"],
  maxSize: "10m",
});

const create = t.Object({ thumbnail });
const update = t.Object({ thumbnail: t.Optional(thumbnail) });

export const ScriptModels = new Elysia().model({
  "script.create": t.Composite([base, create]),
  "script.update": t.Composite([base, update]),
});
