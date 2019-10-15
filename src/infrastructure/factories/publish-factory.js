const AWS = require('aws-sdk');
const PublishCommand = require('../../domain/commands/publish-command');
const ChannelRepository = require('../repositories/channel-repository');
const { pubSub } = require('../services/pubSub');

AWS.config.update({
  accessKeyId: 'AKIAQBNGEWC7C7PZKBEQ',
  secretAccessKey: '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',
});

class PublishFactory {
  create() {
    return new PublishCommand(
      pubSub,
      new ChannelRepository({
        db: new AWS.DynamoDB(),
        document: new AWS.DynamoDB.DocumentClient(),
      }),
    )
  }
}

module.exports = PublishFactory;