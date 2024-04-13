import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { GraphqlContext } from "./interfaces";
import { decodeJWT } from "../services/JWT";
import { User } from "./users";
import { Room } from "./rooms";

export const initServer = async () => {
  const app = express();

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `#graphql
        ${User.types}
        ${Room.types}
        type Query{
            ${User.queries}
            ${Room.queries}
        }
        type Mutation{
            ${User.mutations}
            ${Room.mutations}
        }
        
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Room.resolvers.queries,

      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Room.resolvers.mutations,
      },
      Room:{
        ...Room.resolvers.room
      }
    },
  });
  await graphqlServer.start();
  app.use([cors(), express.json()]);

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => {
        return {
          user: req.headers.authorization
            ? await decodeJWT(req.headers.authorization.split("Bearer ")[1])
            : undefined,
        };
      },
    })
  );
  return app;
};
