import { FieldResolver, Resolver, Args } from "type-graphql";
import User from "./user.type";
import { LearningContent } from "../../learning-content/schema/learning-content.type";
import { SkillLevel, SupportedLanguage } from "../../learning-content/schema/learning-content.enum";
import { LearningContentArgs } from "../../learning-content/schema/learning-content.args";

@Resolver(_of => User)
export default class UserResolver {
  @FieldResolver(() => [LearningContent])
  async learningContents(@Args() _learningContentArgs: LearningContentArgs): Promise<LearningContent[]> {
    return [
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
  }
}
