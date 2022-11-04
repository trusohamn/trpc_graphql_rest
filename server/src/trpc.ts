import * as trpc from '@trpc/server';
import { z } from 'zod';


function createRouter() {
    return trpc.router();
}

// DB 
let id = 0;

const db = {
    users: [
        {
            id: ++id,
            name: 'Marta',
            surname: 'Trusohamn'
        },
    ],
};
// //////

const users = createRouter()
    .mutation('create', {
        input: z.object({
            name: z.string(),
            surname: z.string()
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
    .query('list', {
        resolve: () => db.users,
    });


export const trpcRouter = createRouter()
    .query('hello', {
        input: z.string().nullish(),
        resolve: ({ input }) => {
            return `hello ${input ?? 'world'}`;
        },
    })
    .merge('users.', users)

export type TrpcRouter = typeof trpcRouter;
