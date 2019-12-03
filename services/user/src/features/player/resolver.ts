import { Query } from "type-graphql";
import Player from "./player";

export default class PlayerResolver {
  @Query(_returns => Player)
  async me(): Promise<Player> {
    return {
      id: "123",
      username: "victorious!!!",
    };
  }
}
