import { gql } from "apollo-server-fastify";

const learningContents = [
  {
    id: "321khg",
    title: "Build a FPS",
  },
];

export const learningContentTypeDefs = gql`
  type Query {
    learningContents: [LearningContent]
  }

  type LearningContent @key(fields: "id") {
    id: ID!
    title: String!
  }

  extend type Player @key(fields: "id") {
    id: ID! @external
    learningContents: [LearningContent]
  }
`;

export const learningContentResolvers = {
  Query: {
    learningContents: () => {
      return learningContents;
    },
  },
  Player: {
    learningContents: () => {
      return learningContents;
    },
  },
};
