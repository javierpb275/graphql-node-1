import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";
import axios from "axios";
import { User } from "./types";

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
      nextUser: User
    }
    type Query {
      hello: String
      number: Int
      user(id: Int!): User
    }
  `,
  resolvers: {
    User: {
      name: ({ name }: User) => name + " says: 'Hi!'",
      nextUser: async ({ id }: User) => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id + 1}`
        );
        return data;
      },
    },
    Query: {
      hello: () => "world",
      number: () => 1,
      user: async (_, { id }: { id: number }) => {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users/" + id
        );
        return data;
      },
    },
  },
});
