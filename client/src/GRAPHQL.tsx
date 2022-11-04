import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect, useState } from "react";

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

const HELLO = gql`
  query hello($name: String) {
    hello(name: $name)
  }
`;

const GET_USERS = gql`
  {
    getUsers {
      id
      name
    }
  }
`;

const ADD_USER = gql`
  mutation ($name: String, $surname: String) {
    createUser(name: $name, surname: $surname)
  }
`;

function GRAPHQL() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const hello = await client.query({
        query: HELLO,
        variables: { name: "Marta" },
      });
      await client.mutate({
        mutation: ADD_USER,
        variables: { name: "Newname", surname: "Surname" },
      });
      const users = await client.query({ query: GET_USERS });
      console.log({ hello, users });

      setUsers(users.data.getUsers);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>GRAPHQL</div>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}

const GraphqlWithApollo = () => (
  <ApolloProvider client={client}>
    <GRAPHQL />
  </ApolloProvider>
);

export default GraphqlWithApollo;
