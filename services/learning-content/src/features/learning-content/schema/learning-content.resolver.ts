import { Service } from "typedi";
import { Query, Resolver, Args } from "type-graphql";
import { LearningContent } from "./learning-content.type";
import { SkillLevel, SupportedLanguage } from "./learning-content.enum";
import { LearningContentArgs } from "./learning-content.args";
import { LearningContentService } from "../service/learning-content";

@Service()
@Resolver(() => LearningContent)
export default class LearningContentResolver {
  constructor(private learningContentService: LearningContentService) {}

  data = [
    {
      id: "id",
      title: "title",
      url: "url",
      summary: "summary",
      image: "image",
      skillLevel: SkillLevel.ADVANCED,
      duration: 1234567890,
      topics: ["fps", "arcade"],
      industry: "industry",
      recordCount: 88,
      isPremium: true,
      authors: ["mike", "john"],
      language: SupportedLanguage.EN,
    },
  ];

  @Query(() => LearningContent)
  async learningContents(@Args() learningContentArgs: LearningContentArgs): Promise<LearningContent[]> {
    const response = await this.learningContentService.getLearningContent(learningContentArgs);
    return this.data;
  }
}
