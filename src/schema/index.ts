import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: gql`
    type User {
      id: Int
      name: String
    }
    type Query {
      hello: String
      number: Int
      user: User
    }
  `,
  resolvers: {
    User: {
      name: (parent) => parent.name + " Pérez",
    },
    Query: {
      hello: () => "world",
      number: () => 1,
      user: () => ({ id: 1, name: "Pepe" }),
    },
  },
});
