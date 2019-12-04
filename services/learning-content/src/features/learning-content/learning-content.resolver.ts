import { Query, Resolver } from "type-graphql";
import LearningContent from "./learning-content.type";

@Resolver(_of => LearningContent)
export default class LearningContentResolver {
  data = [
    {
      id: "123ghg",
      title: "Build a FPS",
    },
  ];

  @Query(_returns => LearningContent)
  async learningContents(): Promise<LearningContent[]> {
    return this.data;
  }
}
