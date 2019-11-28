import { gql } from "apollo-server-fastify";

export const playerTypeDefs = gql`
  type Query {
    me: Player!
  }

  type Player @key(fields: "id") {
    id: ID!
    username: String!
  }
`;

const players = [
  {
    id: "123aaabc",
    username: "victorious",
  },
];

export const playerResolver = {
  Query: {
    me: () => {
      return players[0];
    },
  },
  Player: {
    __resolveReference() {
      return players[0];
    },
  },
};
