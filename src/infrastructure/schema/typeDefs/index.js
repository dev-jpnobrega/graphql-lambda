module.exports = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
  }

  type Channel {
    id: ID!
    name: String!
  }

  type Publication {
    id: ID!
    message: String!
    user: User!
    channel: Channel!
  }

  input PublicationInput {
    message: String!
    userId: ID!
    channelId: ID!
  }

  type Mutation {
    publish(publicationInput: PublicationInput): String!
  }

  type Query {
    getChannels: [Channel!]
  }

  type Subscription {
    channelNews(channelId: ID!): Publication
  }
`;
