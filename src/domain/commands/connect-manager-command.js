const BaseCommand = require('./base-command');
const { CHANNEL_PUBLISH } = require('../../helpers/events');

const channel = {
  id: '6d0aa898-6e79-4348-a4fc-24890c763d01',
  info: {
    name: 'React Hooks',
    description: 'Description channel React hooks',
    urlImage: 'http://',
  },
}

class ConnectManagerCommand extends BaseCommand {
  constructor(pubSubService, channelRespository) {
    super();

    this.pubSubService = pubSubService;
    this.channelRespository = channelRespository;
  }

  async subscribeChannel(channelId, person) {
    await this.channelRespository.subscribe(channelId, {
      ...person,
    })
  }

  async execute({ event, context }) {
    console.warn('event', event);

    try {
      const { 
        requestContext: { domainName, routeKey, eventType, stage, connectedAt, connectionId }
      } = event;

      const result = await this.subscribeChannel(channel.id, {
        connectedAt, connectionId, callbackUrl: `https://${domainName}/${stage}`,
      })

      return this.emit('success', result);
    } catch (error) {
      console.warn('error', error);
      return this.emit('success', {});
    }    
  }
}

module.exports = ConnectManagerCommand;
