import { FieldResolver, Resolver } from "type-graphql";
import User from "./user.type";
import LearningContent from "../learning-content/learning-content.type";

@Resolver(_of => User)
export default class UserResolver {
  @FieldResolver(() => [LearningContent])
  async learningContents(): Promise<LearningContent[]> {
    return [
      {
        id: "aaa",
        title: "Learn Typescript!",
      },
    ];
  }
}
