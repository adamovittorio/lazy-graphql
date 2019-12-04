import { Query, Resolver, Args } from "type-graphql";
import { LearningContent } from "./learning-content.type";
import { SkillLevel, SupportedLanguage } from "./learning-content.enum";
import { LearningContentArgs } from "./learning-content.args";

@Resolver(_of => LearningContent)
export default class LearningContentResolver {
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

  @Query(_returns => LearningContent)
  async learningContents(@Args() { skip, limit }: LearningContentArgs): Promise<LearningContent[]> {
    console.log(skip, limit);
    return this.data;
  }
}
