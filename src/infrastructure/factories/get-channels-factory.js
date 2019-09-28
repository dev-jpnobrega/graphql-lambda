const GetChannelsCommand = require('../../domain/commands/get-channels-command');
const ChannelRepository = require('../repositories/channel-repository');

class GetChannelsFactory {
  create() {
    return new GetChannelsCommand(
      new ChannelRepository({}),
    )
  }
}

module.exports = GetChannelsFactory;