import { Service } from "typedi";
import LearnAPI from "../../../integration-service/learn-api/learn-api.is";
import LearnAPIMapper from "../../../integration-service/learn-api/learning-api.mapper";
import LearningContent from "../schema/learning-content.type";
import { LearningContentArgs } from "../schema/learning-content.args";

@Service()
export class LearningService {
  constructor(private readonly learnAPI: LearnAPI, private readonly learnAPIMapper: LearnAPIMapper) {}

  async getLearningContents(args: LearningContentArgs): Promise<LearningContent[]> {
    const response = await this.learnAPI.getLearningContents(args);
    return this.learnAPIMapper.mapLearnAPIResponseToLearnContents(response);
  }
}
