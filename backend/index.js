import express from 'express';
import http from 'http';
import cors from 'cors';

import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session'

import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server"

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from './db/connectDB.js';
import { configurePassport } from './passport/passport.config.js';

dotenv.config();
configurePassport();
const app = express();

const httpServer = http.createServer(app);
const MangoDBStore = connectMongo(session);

const store = new MangoDBStore({
uri:process.env.MONGO_URI,
collection:"sessions",

})

store.on("error" , (err)=>  console.log(err));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, /// this option specifies whether to save the session to the store on evary req
    saveUninitialized: false,
    cookie :{
     maxAge: 1000*60*60*24*7,
     httpOnly: true /// this option prevents the Cross-Sitr-Scripting (Xss) atteck
    },
    store:store
  })
)

app.use(passport.initialize());
app.use(passport.session());


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await server.start();

app.use(
  '/',
  cors({
    origin:"http://localhost:3000",
    credentials:true,
  }),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req , res }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();
console.log(`🚀 Server ready at http://localhost:4000/`);