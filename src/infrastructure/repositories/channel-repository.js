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
  constructor({ db, document }) {
    this.db = db;
    this.document = document;
  }

  async getChannelById(channelId) {
    return channels.find(channel => channel.id === channelId);
  }

  async getChannels() {
    return channels;
  }

  async create(channel) {
    const params = {
      TableName: "Channel",
      Item: {
        ID: channel.id,
        ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
        info: {
          name: channel.info.name,
          description: channel.info.description,
          urlImage: channel.info.urlImage || '',
        },
        subscribers: [],
        messages: [{
          message: `Channel ${channel.info.name} live.`,
          date: new Date().toISOString(),
        }]
      }
    }

    return this.document.put(params).promise();
  }

  async publishMessage(channelId, publication) {
    const params = {
      TableName: 'Channel',
      Key: { 'ID': channelId },
      UpdateExpression: 'set content.messages = list_append(content.messages, :r)',  // "add #1 :r",      
      ExpressionAttributeValues: {
        ':r': [{ ...publication }],
      },
      ReturnValues: "ALL_NEW"
    }

    return this.document.update(params).promise();
  }

  async subscribe(channelId, person) {
    const params = {
      TableName: 'Channel',
      Key: { 'ID': channelId },
      UpdateExpression: 'set subscribers = list_append(subscribers, :person)',  // "add #1 :r",      
      ExpressionAttributeValues: {
        ':person': [{ ...person }],
      },
      ReturnValues: 'ALL_NEW'
    }

    return this.document.update(params).promise();
  }

  async unSubscribe(channelId, person) {
    const params = {
      TableName: 'Channel',
      Key: { 'ID': channelId },
      UpdateExpression: 'set subscribers = list_append(subscribers, :person)',  // "add #1 :r",      
      ExpressionAttributeValues: {
        ':person': [{ ...person }],
      },
      ReturnValues: 'ALL_NEW'
    }

    return this.document.update(params).promise();
  }
}

module.exports = ChannelRepository;