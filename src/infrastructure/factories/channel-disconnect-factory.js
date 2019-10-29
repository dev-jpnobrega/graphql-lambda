const AWS = require('aws-sdk');
const ChannelDisconnectCommand = require('../../domain/commands/channel-disconnect-command');
const ChannelRepository = require('../repositories/channel-repository');
const { pubSub } = require('../services/pubSub');

class ChannelDisconnectFactory {
  create() {
    return new ChannelDisconnectCommand(
      pubSub,
      new ChannelRepository({
        db: new AWS.DynamoDB(),
        document: new AWS.DynamoDB.DocumentClient(),
      }),
    )
  }
}

module.exports = ChannelDisconnectFactory;