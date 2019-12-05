import { ArgsType, Field, Int } from "type-graphql";
import { Min, Max } from "class-validator";
import { ContentType, SupportedLanguage, SkillLevel } from "./learning-content.enum";

// TODO: extract reusable args in a common interface in shared
@ArgsType()
export class LearningContentArgs {
  @Field(() => Int, { description: "Skip the first n resources" })
  @Min(0)
  skip = 0;

  @Field(() => Int, { description: "Limit the number of resources" })
  @Min(1)
  @Max(50)
  limit = 25;

  @Field({ description: "Learn API native filter" })
  filter: string;

  @Field(() => ContentType, { description: "Learn API native filter" })
  contentType: ContentType;

  @Field(() => [SupportedLanguage], { description: "Learn API language filter" })
  languages: SupportedLanguage[];

  @Field(() => SkillLevel, { description: "Learn API skill level filter" })
  skillLevel: SkillLevel;
}
