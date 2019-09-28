const PublishCommand = require('../../domain/commands/publish-command');
const ChannelRepository = require('../repositories/channel-repository');
const { pubSub } = require('../services/pubSub');

class PublishFactory {
  create() {
    return new PublishCommand(
      pubSub,
      new ChannelRepository({}),
    )
  }
}

module.exports = PublishFactory;