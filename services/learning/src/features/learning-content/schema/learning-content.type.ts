import { ObjectType, Directive } from "type-graphql";
import ILearningContent from "./learning-content.interface";
import { SkillLevel } from "./learning-content.enum";

@Directive(`@key(fields: "id")`)
@ObjectType({
  description: "A Unity learn content (eg. project, tutorial, courses...)",
  implements: ILearningContent,
})
export default class LearningContent implements ILearningContent {
  id: string;
  title: string;
  url: string;
  summary: string;
  image: string;
  skillLevel: SkillLevel;
  duration: number;
  topics: string[];
  industry: string;
  recordCount: number;
  isPremium: boolean;
  authors: string[];
  language: string;
}
