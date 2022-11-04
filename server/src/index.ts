import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'

import { trpcRouter } from './trpc'
import { schema, root } from './graphql'
import restRouter from './rest'

async function main() {
    const app = express();
    app.use(cors())
    app.use((req, _res, next) => {
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

        next();
    });

    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: trpcRouter,
        }),
    );

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.use('/rest', restRouter)

    app.get('/', (_req, res) => res.send('hello'));
    app.listen(2021, () => {
        console.log('listening on port 2021');
    });
}

main();