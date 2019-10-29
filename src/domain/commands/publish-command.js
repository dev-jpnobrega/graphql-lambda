const BaseCommand = require('./base-command');
const { CHANNEL_PUBLISH } = require('../../helpers/events');

const uuid = require('uuid/v4');

const channel = {
  id: '6d0aa898-6e79-4348-a4fc-24890c763d01',
  info: {
    name: 'React Hooks',
    description: 'Description channel React hooks',
    urlImage: 'http://',
  },
}


class PublishCommand extends BaseCommand {
  constructor(pubSubService, channelRespository) {
    super();

    this.pubSubService = pubSubService;
    this.channelRespository = channelRespository;
  }

  async subscribe() {
    const rs = await this.channelRespository.subscribe(channel.id, {
      connectionId: uuid(),
      userId: 2,
      name: 'JP'
    });

    console.warn('rs- subscribe', rs);
  }

  async unSubscribe() {
    const rs = await this.channelRespository.unSubscribe(channel.id, {
      connectionId: '6d0aa898-6e79-4348-a4fc-24890c763d19',
      userId: 2,
      name: 'JP'
    });

    console.warn('rs- unSubscribe', rs);
  }

  async createChannel() {
    await this.channelRespository.create(channel);
  }

  async execute({ publicationInput }) {
    const { channelId, message, userId } = publicationInput;
 
    try {
        await this.subscribe();
        await this.unSubscribe();
      /*
      const data = await this.channelRespository.publishMessage2(channelId, {
        message,
        userId,
        date: new Date().toISOString(),
      });
   
      console.warn('channel publish result', data);
  
      this.pubSubService.publish(CHANNEL_PUBLISH, {
        channelId,
        message,
        userId,
      });

      */

      return this.emit('success', 'Publish your message successfull');
    } catch (error) {
      console.warn('error', error);
      return this.emit('success', 'No publish your message. Error ');
    }    
  }
}

module.exports = PublishCommand;
