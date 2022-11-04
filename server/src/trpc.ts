import * as trpc from '@trpc/server';
import { z } from 'zod';


function createRouter() {
    return trpc.router();
}

let id = 0;

const db = {
    posts: [
        {
            id: ++id,
            title: 'hello',
        },
    ],
};

const posts = createRouter()
    .mutation('create', {
        input: z.object({
            title: z.string(),
        }),
        resolve: ({ input }) => {
            const post = {
                id: ++id,
                ...input,
            };
            db.posts.push(post);
            return post;
        },
    })
    .query('list', {
        resolve: () => db.posts,
    });

// root router to call
export const trpcRouter = createRouter()
    .query('hello', {
        input: z.string().nullish(),
        resolve: ({ input, ctx }) => {
            return `hello ${input ?? 'world'}`;
        },
    })
    .merge('post.', posts)

export type TrpcRouter = typeof trpcRouter;
