const AWS = require('aws-sdk');
const ConnectManagerCommand = require('../../domain/commands/connect-manager-command');
const ChannelRepository = require('../repositories/channel-repository');
const { pubSub } = require('../services/pubSub');

class ConnectManagerFactory {
  create() {
    return new ConnectManagerCommand(
      pubSub,
      new ChannelRepository({
        db: new AWS.DynamoDB(),
        document: new AWS.DynamoDB.DocumentClient(),
      }),
    )
  }
}

module.exports = ConnectManagerFactory;