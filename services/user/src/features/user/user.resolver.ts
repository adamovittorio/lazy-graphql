import { Query, Resolver } from "type-graphql";
import User from "./user.type";

@Resolver(_of => User)
export default class UserResolver {
  user = {
    id: "123",
    username: "victorious",
  };

  @Query(_returns => User)
  async me(): Promise<User> {
    return this.user;
  }
}
