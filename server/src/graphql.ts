import { buildSchema } from 'graphql';

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

type UserInput = {
    name: string
    surname: string
}

type HelloInput = {
    name: string
}

export const schema = buildSchema(`
  type Query {
    hello(name: String): String
    getUsers: [User]
  }
  type User {
    id: String
    name: String
    surname: String
  }
  type Mutation {
    createUser(name: String, surname: String): Boolean
  }
`);

export const root = {
    hello: (arg: HelloInput) => "Hello " + arg.name,
    getUsers: () => db.users,
    createUser: (arg: UserInput) => {
        const user = {
            id: ++id,
            ...arg,
        };
        db.users.push(user);

    }
};