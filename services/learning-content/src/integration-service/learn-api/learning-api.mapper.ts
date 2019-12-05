import { Service } from "typedi";
import { LearningContent } from "../../features/learning-content/schema/learning-content.type";
import { LearnAPIResponse, LearnAPIContent } from "./learning-api.types";
import { SkillLevel } from "../../features/learning-content/schema/learning-content.enum";

@Service()
export default class LearnAPIMapper {
  static unityUrl: "https://learn.unity.com";
  mapLearnAPIResponseToLearnContent({ results }: LearnAPIResponse): LearningContent[] {
    return results.map(this.mapResult);
  }

  static mapSkillLevel(skillLevel: string): SkillLevel {
    const skillLevelsDictionary: { [skillLevel: string]: SkillLevel } = {
      beginner: SkillLevel.BEGINNER,
      intermediate: SkillLevel.INTERMEDIATE,
      advanced: SkillLevel.ADVANCED,
    };

    return skillLevelsDictionary[skillLevel];
  }

  mapResult(result: LearnAPIContent): LearningContent {
    const type = result.type;
    const content = result[type];

    const { id } = content;
    const ownerId = content.ownerId.substring(2); // remove 'u_' prefix

    return {
      id,
      topics: [""],
      industry: "string",
      title: content.title,
      url: `${LearnAPIMapper.unityUrl}/${type}/${content.slug}`,
      summary: content.descPlain,
      image: content.thumbnail.url,
      skillLevel: LearnAPIMapper.mapSkillLevel(content.skillLevel),
      duration: content.duration,
      isPremium: content.premium,
      language: content.language,
      recordCount: content.statsMap[id].recordCount,
      authors: [content.userMap[ownerId].name],
    };
  }
}
