import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";
import axios from "axios";
import { Post, User } from "./types";

export const schema = createSchema({
  typeDefs: gql`
    type Post {
      userId: Int
      id: Int
      title: String
      body: String
      user: User
    }
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
      posts: [Post]
    }
    type Query {
      hello: String
      number: Int
      user(id: Int!): User
    }
  `,
  resolvers: {
    Post: {
      user: async ({ userId }: Post): Promise<User> => {
        const { data: user } = await axios.get(
          "https://jsonplaceholder.typicode.com/users/" + userId
        );
        return user;
      },
    },
    User: {
      posts: async ({ id }: User) => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        return data;
      },
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
      user: async (_, { id }: { id: number }): Promise<User> => {
        const { data: user } = await axios.get(
          "https://jsonplaceholder.typicode.com/users/" + id
        );
        return user;
      },
    },
  },
});
