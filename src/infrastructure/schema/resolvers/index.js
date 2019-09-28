const { Adapter, AdapterSubscription } = require('../../resolver-to-command-factory');
const PublishFactory = require('../../factories/publish-factory');
const GetChannelsFactory = require('../../factories/get-channels-factory');
const ChannelSubcribeFactory = require('../../factories/channel-subcribe-factory');

const mutations = {
  publish: Adapter(PublishFactory),
}

const queries = { 
  getChannels: Adapter(GetChannelsFactory),
}

const subscriptions = {
  channelNews: AdapterSubscription(ChannelSubcribeFactory)
}

module.exports = {
  Query: queries,
  Mutation: mutations,
  Subscription: subscriptions,
}