const { withFilter } = require('graphql-subscriptions');
const { pubSub } = require('../services/pubSub');

class ChannelSubcribeFactory {
  create() {
    return new ChannelSubcribeCommand(
      pubSub,
      withFilter,
    )
  }
}

module.exports = ChannelSubcribeFactory;