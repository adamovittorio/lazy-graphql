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

  type Videogame {
    id: ID!
    title: String!
  }
`;

export const videogameResolvers = {
  Query: {
    videogames: () => {
      return videogames;
    },
  },
};
