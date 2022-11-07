import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect, useState } from "react";
import Display from "./Display";
import { User } from "./types";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "http://localhost:2021/graphql",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const GET_USERS = gql`
  {
    getUsers {
      id
      name
      surname
    }
  }
`;

const ADD_USER = gql`
  mutation ($name: String, $surname: String) {
    createUser(name: $name, surname: $surname)
  }
`;

function GRAPHQL() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await client.mutate({
        mutation: ADD_USER,
        variables: { name: "Newname", surname: "Surname" },
      });
      const users = await client.query({ query: GET_USERS });

      setUsers(users.data.getUsers);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>GRAPHQL</div>
      <Display users={users} />
    </div>
  );
}

const GraphqlWithApollo = () => (
  <ApolloProvider client={client}>
    <GRAPHQL />
  </ApolloProvider>
);

export default GraphqlWithApollo;
