module.exports = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
  }

  type Channel {
    id: ID!
    name: String!
  }

  type ChannelNew {
    id: ID!
    message: String!
    user: User!
    channel: Channel!
  }

  input PublishInput {
    message: String!
    userId: ID!
    channelId: ID!
  }

  type Mutation {
    publish(publishInput: PublishInput): String!
  }

  type Query {
    getChannels: [Channel!]
  }

  type Subscription {
    channelNews(channelId: ID!): ChannelNew
  }
`;
