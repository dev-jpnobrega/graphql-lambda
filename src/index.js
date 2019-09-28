const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const ApolloExpress = require('apollo-server-express');
const bodyParser = require('body-parser');

const schema = require('./infrastructure/schema');

const createServer = (schema) => (event, context) => {
  return new Promise(async (resolve) => {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));

    await new ApolloExpress.ApolloServer({
      schema,
      playground: true,
    }).applyMiddleware({ app, path: '/graphql' });

    const server = awsServerlessExpress.createServer(app);

    awsServerlessExpress.proxy(server, event, {
      ...context,
      succeed: process.env.IS_OFFLINE ? context.succeed : resolve,
    })
  });
}

module.exports.handler = createServer(schema);

module.exports.subscribe = async (event, context) => {
  console.warn('event', event);
  console.warn('context', context);
  
  createServer(schema)(event, context);

  return {
    statusCode: 200,
    body: ''
  }
}
