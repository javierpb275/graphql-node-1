import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: gql`
    type Company {
      name: String
      catchPhrase: String
      bs: String
    }
    type Geo {
      lat: String
      lng: String
    }
    type Address {
      street: String
      suite: String
      city: String
      zipcode: String
      geo: Geo
    }
    type User {
      id: Int
      name: String
      username: String
      email: String
      phone: String
      website: String
      company: Company
      address: Address
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
