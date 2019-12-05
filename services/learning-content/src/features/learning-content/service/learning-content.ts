import { Service } from "typedi";
import LearnAPI from "../../../integration-service/learn-api/learning-api";
import { LearningContentArgs } from "../schema/learning-content.args";

@Service()
export class LearningContentService {
  constructor(private readonly learnApi: LearnAPI) {}

  async getLearningContent(learningContentService: LearningContentArgs) {
    return this.learnApi.getLearningContent(learningContentService);
  }
}
