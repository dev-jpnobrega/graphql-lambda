const uuid = require('uuid/v4');

const channels = [
  {
    id: uuid(),
    name: 'React'
  },
  {
    id: uuid(),
    name: 'Open Source'
  },
]

class ChannelRepository {
  constructor(db) {
    this.db = db;
  }

  async getChannelById(channelId) {
    return channels.find(channel => channel.id === channelId);
  }

  async getChannels() {
    return channels;
  }
}

module.exports = ChannelRepository;