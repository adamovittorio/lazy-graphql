import { FieldResolver, Resolver, Args } from "type-graphql";
import User from "./user.type";
import LearningContent from "../../learning-content/schema/learning-content.type";
import { LearningContentArgs } from "../../learning-content/schema/learning-content.args";
import { LearningService } from "../../learning-content/service/learning";

@Resolver(() => User)
export default class UserResolver {
  constructor(private learningService: LearningService) {}
  @FieldResolver(() => [LearningContent])
  async learningContents(@Args() args: LearningContentArgs): Promise<LearningContent[]> {
    return this.learningService.getLearningContents(args);
  }
}
