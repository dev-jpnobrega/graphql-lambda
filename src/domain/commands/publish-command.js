const BaseCommand = require('./base-command');
const { CHANNEL_PUBLISH } = require('../../helpers/events');

class PublishCommand extends BaseCommand {
  constructor(pubSubService, channelRespository) {
    super();

    this.pubSubService = pubSubService;
    this.channelRespository = channelRespository;
  }

  async execute({
    channelId, message, userId,
  }) {
    console.warn('params', params);

    const channel = await this.channelRespository.getChannelById(channelId);

    this.pubSubService.publish(CHANNEL_PUBLISH, {
      channel,
      message,
      userId,
    });

    return this.emit('success', params.message);
  }
}

module.exports = PublishCommand;
