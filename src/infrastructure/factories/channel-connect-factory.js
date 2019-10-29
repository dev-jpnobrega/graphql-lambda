const AWS = require('aws-sdk');
const ChannelConnectCommand = require('../../domain/commands/channel-connect-command');
const ChannelRepository = require('../repositories/channel-repository');
const { pubSub } = require('../services/pubSub');

class ChannelConnectFactory {
  create() {
    return new ChannelConnectCommand(
      pubSub,
      new ChannelRepository({
        db: new AWS.DynamoDB(),
        document: new AWS.DynamoDB.DocumentClient(),
      }),
    )
  }
}

module.exports = ChannelConnectFactory;