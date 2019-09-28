const BaseCommand = require('./base-command');
const { CHANNEL_PUBLISH } = require('../../helpers/events');

class PublishCommand extends BaseCommand {
  constructor(pubSubService, withFilter) {
    super();

    this.pubSubService = pubSubService;
    this.withFilter = withFilter;
  }

  async execute(params) {
    console.warn('params', params);

    return this.emit('success', params);
  }

  subcribe() {
    return this.withFilter(() => 
      this.pubSubService.asyncIterator(CHANNEL_PUBLISH),
      (payload, variables) => {    
        return payload ? payload.channelId === variables.channelId : payload
      }
    )
  }
}

module.exports = PublishCommand;
 