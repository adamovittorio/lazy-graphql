import fetch from "node-fetch";
import { Service } from "typedi";
import { LearningContentArgs } from "../../features/learning-content/schema/learning-content.args";

@Service()
class LearnAPI {
  // TODO: extend RESTConnector in shared
  baseURL: string;
  constructor() {
    this.baseURL = "https://connect.unity.com/api/learn";
  }

  async getLearningContent(learningContentArgs: LearningContentArgs) {
    let response;
    try {
      response = await fetch(this.baseURL + this.buildLearningContentEndpoint(learningContentArgs)).then(res =>
        res.json()
      );
    } catch (e) {
      // TODO: LearnApi Error
      throw e;
    }
    return response;
  }

  private buildLearningContentFilter({ contentType, skillLevel, languages }: LearningContentArgs): string {
    return JSON.stringify([`t:${contentType}`, `sl:${skillLevel}`, languages.map(lang => `lang:${lang}`).flat()]);
  }

  private buildLearningContentEndpoint(learningContentArgs: LearningContentArgs): string {
    const { skip, limit } = learningContentArgs;
    const filter = this.buildLearningContentFilter(learningContentArgs);

    return `/search?ob=recency&k=${filter}&page=${skip}&pageSize=${limit}`;
  }
}

export default LearnAPI;
