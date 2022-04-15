import { ApolloClient, InMemoryCache, ApolloLink, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const uploadLink = createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, credentials: "include" });

const authLink = setContext((_, { headers }) => {
  // const token = App.getAccessToken();
  return {
    credentials: "include",
    headers: {
      ...headers,
      "app-type": "client"
      // Authorization: `Bearer ${token}`
    }
  };
});

const wsLink = () => {
  // const token = App.getAccessToken();
  return new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SOCKET_URL || `ws://localhost:3000/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          // Authorization: `Bearer ${token}`,
          // authorization: `Bearer ${token}`
        }
      }
    }
  });
};

const links = ApolloLink.from([authLink, uploadLink as unknown as ApolloLink]);

const splitLink =
  process.browser && process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION === "true"
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
        },
        wsLink(),
        links
      )
    : links;

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  }
});

export const createApolloClient = (token: string) => {
  const uploadLink = createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, credentials: "include" });
  const authLink = setContext((_, { headers }) => ({ headers: { ...headers, Authorization: `Bearer ${token}` } }));
  const link = ApolloLink.from([authLink, uploadLink as unknown as ApolloLink]);
  return new ApolloClient({ link: link, cache: new InMemoryCache() });
};

export default apolloClient;
