import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: gql`
    type Query {
      hello: String
      number: Int
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
      number: () => 1,
    },
  },
});
