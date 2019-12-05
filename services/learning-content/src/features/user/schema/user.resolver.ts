import { FieldResolver, Resolver, Args } from "type-graphql";
import User from "./user.type";
import { LearningContent } from "../../learning-content/schema/learning-content.type";
import { LearningContentArgs } from "../../learning-content/schema/learning-content.args";
import { LearningContentService } from "../../learning-content/service/learning-content";

@Resolver(_of => User)
export default class UserResolver {
  constructor(private learningContentService: LearningContentService) {}
  @FieldResolver(() => [LearningContent])
  async learningContents(@Args() args: LearningContentArgs): Promise<LearningContent[]> {
    return this.learningContentService.getLearningContent(args);
  }
}
