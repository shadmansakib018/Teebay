import 'reflect-metadata';
import { AppDataSource } from './data-source';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import 'dotenv/config';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/UserResolver';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { PostResolver } from './resolvers/PostResolver';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(
      cors({
        origin: '*',
        credentials: true,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, UserResolver, PostResolver],
        validate: false,
      }),
      context: ({ req, res }) => ({
        userRepo: AppDataSource.getRepository(User),
        postRepo: AppDataSource.getRepository(Post),
      }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });

    app.listen(parseInt(process.env.PORT!), () => {
      console.log('server started on localhost:4000');
    });
  })
  .catch((error) => console.log(error));
