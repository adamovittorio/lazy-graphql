import { Query, Resolver } from "type-graphql";
import Player from "./player";

@Resolver(_of => Player)
export default class PlayerResolver {
  player = {
    id: "123",
    username: "victorious",
  };

  @Query(_returns => Player)
  async me(): Promise<Player> {
    return this.player;
  }
}
