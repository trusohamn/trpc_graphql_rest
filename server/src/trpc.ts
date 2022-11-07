import * as trpc from "@trpc/server";
import { z } from "zod";

function createRouter() {
  return trpc.router();
}

// DB
let id = 0;

const db = {
  users: [
    {
      id: 0,
      name: "Marta",
      surname: "Trusohamn",
    },
    {
      id: 1,
      name: "Rodrigo",
      surname: "Acuna",
    },
  ],
  cats: [
    { name: "Blacky", ownerId: 0 },
    { name: "Pelle", ownerId: 1 },
  ],
};

// //////

const users = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      surname: z.string(),
    }),
    resolve: ({ input }) => {
      const user = {
        id: ++id,
        ...input,
      };
      db.users.push(user);
      return user;
    },
  })
  .query("list", {
    resolve: () => db.users,
  });

const cats = createRouter().query("list", {
  resolve: () => db.cats,
});

export const trpcRouter = createRouter()
  .query("hello", {
    input: z.string().nullish(),
    resolve: ({ input }) => {
      return `hello ${input ?? "world"}`;
    },
  })
  .merge("users.", users)
  .merge("cats.", cats);

export type TrpcRouter = typeof trpcRouter;
