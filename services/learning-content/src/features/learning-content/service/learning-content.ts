import { Service } from "typedi";
import LearnAPI from "../../../integration-service/learn-api/learn-api.is";
import LearnAPIMapper from "../../../integration-service/learn-api/learning-api.mapper";
import { LearningContentArgs } from "../schema/learning-content.args";
import { LearningContent } from "../schema/learning-content.type";

@Service()
export class LearningContentService {
  constructor(private readonly learnApi: LearnAPI, private readonly learnApiMapper: LearnAPIMapper) {}

  async getLearningContent(args: LearningContentArgs): Promise<LearningContent[]> {
    const response = await this.learnApi.getLearningContent(args);
    const mapped = this.learnApiMapper.mapLearnAPIResponseToLearnContent(response);
    return mapped;
  }
}
