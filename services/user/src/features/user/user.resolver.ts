import { Query, Resolver } from "type-graphql";
import User from "./user.type";

@Resolver(() => User)
export default class UserResolver {
  @Query(_returns => User)
  async me(): Promise<User> {
    return {
      id: "123",
      username: "victorious",
    };
  }
}
