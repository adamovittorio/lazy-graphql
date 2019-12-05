import { Service } from "typedi";
import { Query, Resolver, Args } from "type-graphql";
import { LearningContent } from "./learning-content.type";
import { LearningContentArgs } from "./learning-content.args";
import { LearningContentService } from "../service/learning-content";

@Service()
@Resolver(() => LearningContent)
export default class LearningContentResolver {
  constructor(private learningContentService: LearningContentService) {}
  @Query(() => [LearningContent])
  async learningContents(@Args() args: LearningContentArgs): Promise<LearningContent[]> {
    return this.learningContentService.getLearningContent(args);
  }
}
