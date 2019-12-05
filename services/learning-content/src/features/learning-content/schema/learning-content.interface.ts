import { Field, ID, Int, InterfaceType } from "type-graphql";
import { SkillLevel } from "./learning-content.enum";

@InterfaceType()
export default abstract class ILearningContent {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  summary: string;

  @Field()
  image: string;

  @Field(() => SkillLevel)
  skillLevel: SkillLevel;

  @Field(() => Int)
  duration: number;

  @Field(() => [String])
  topics: string[];

  @Field()
  industry: string;

  @Field(() => Int)
  recordCount: number;

  @Field()
  isPremium: boolean;

  @Field(() => [String])
  authors: string[];

  @Field()
  language: string;
}
