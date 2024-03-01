import express from "express";
import { PubSub } from "graphql-subscriptions";
import gql from "graphql-tag";
import { createServer } from "http";

//Asynchronous Anonymous Function
// Inside of server.ts -> await keyword

(async function () {
  // Server code in here!
  const pubsub = new PubSub(); // Publish and Subscribe, Publish -> eevryone gets to hear it
  const app = express();
  const httpServer = createServer(app);

  // GraphQL Typedefs and resolvers
  const typeDefs = gql`
    type NewsEvent {
      title: String
      description: String
    }
    type Query {
      placeholder: Boolean
    }
    type Mutation {
      createNewsEvent(title: String, description: String): NewsEvent
    }
    type Subscription {
      newsFeed: NewsEvent
    }
  `;

  interface CreateNewsEventInput {
    title: string;
    description: string;
  }

  const resolvers = {
    Query: {
      placeholder: () => {
        return true;
      }, // apollo server requires a query to exist in your server
    },
    Mutation: {
      createNewsEvent: (_parent: any, args: CreateNewsEventInput) => {
        console.log(args);
        pubsub.publish("EVENT_CREATED", { newsFeed: args });

        // Save news events to a database: you can do it here!

        // Create something: EVENT_CREATED
        // Subscribe to something: EVENT_CREATED
        return args;
      },
    },
    Subscription: {
      newsFeed: {
        subscribe: () => pubsub.asyncIterator(["EVENT_CREATED"]),
      },
    },
  };
})();
