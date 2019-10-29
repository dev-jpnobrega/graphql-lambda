const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const ApolloExpress = require('apollo-server-express');
const bodyParser = require('body-parser');

const CommandFactory = require('./helpers/command-factory');

const ConnectManagerFactory = require('./infrastructure/factories/connect-manager-factory');
const ChannelConnectFactory = require('./infrastructure/factories/channel-connect-factory');
const ChannelDisconnectFactory = require('./infrastructure/factories/channel-disconnect-factory');

const schema = require('./infrastructure/schema');

const TYPES = {
  CONNECTION: '$connect',
  DISCONNECT: '$disconnect',
  DEFAULT: '$default',
}

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

const createHandler = (routers) => async (event, context) => {
  const { requestContext: { routeKey } } = event;

  try {
    const handle = routers[routeKey];
    console.warn('handle', handle);

    if (handle) {
      const result = await handle({ event, context });

      console.warn('result', result);

      return {
        statusCode: 200,
        body: result 
      }
    }
  } catch (error) {
    console.error('ERRROR-HANDLER', error);
  }
  
  return {
    statusCode: 200,
    body: ''
  }
}

module.exports.handler = createServer(schema);

module.exports.subscribe = createHandler({
  [TYPES.CONNECTION]: CommandFactory.createAndPromisify(ChannelConnectFactory),
  [TYPES.DISCONNECT]: CommandFactory.createAndPromisify(ChannelDisconnectFactory),
  [TYPES.DEFAULT]: CommandFactory.createAndPromisify(ConnectManagerFactory),
})
