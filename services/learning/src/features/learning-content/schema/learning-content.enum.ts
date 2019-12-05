import { registerEnumType } from "type-graphql";

export enum SupportedLanguage {
  EN = "en",
  ES = "es",
  JA = "ja",
  ZH = "zh",
  FR = "fr",
  DE = "de",
}

registerEnumType(SupportedLanguage, {
  name: "SupportedLanguage",
  description: "The supported languages",
});

export enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

registerEnumType(SkillLevel, {
  name: "SkillLevel",
  description: "The available skill levels",
});

export enum ContentType {
  PROJECT = "project",
  COURSE = "course",
  TUTORIAL = "tutorial",
  QUIZ = "quiz",
}

registerEnumType(ContentType, {
  name: "ContentType",
  description: "The available learning content type",
});
