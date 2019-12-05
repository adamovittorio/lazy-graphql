import { Service } from "typedi";
import { Query, Resolver, Args } from "type-graphql";
import LearningContent from "./learning-content.type";
import { LearningContentArgs } from "./learning-content.args";
import { LearningService } from "../service/learning";

@Service()
@Resolver(() => LearningContent)
export default class LearningContentResolver {
  constructor(private learningService: LearningService) {}
  @Query(() => [LearningContent])
  async learningContents(@Args() args: LearningContentArgs): Promise<LearningContent[]> {
    return this.learningService.getLearningContents(args);
  }
}
