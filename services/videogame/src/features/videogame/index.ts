import { gql } from "apollo-server-fastify";

const videogames = [
  {
    id: "321khg",
    title: "starctraft II",
  },
];

export const videogameTypeDefs = gql`
  type Query {
    videogames: [Videogame]
  }

  type Videogame @key(fields: "id") {
    id: ID!
    title: String!
  }

  extend type Player @key(fields: "id") {
    id: ID! @external
    videogames: [Videogame]
  }
`;

export const videogameResolvers = {
  Query: {
    videogames: () => {
      return videogames;
    },
  },
  Player: {
    videogames: () => {
      return videogames;
    },
  },
};
