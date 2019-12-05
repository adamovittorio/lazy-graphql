import fetch from "node-fetch";
import { Service } from "typedi";
import { LearningContentArgs } from "../../features/learning-content/schema/learning-content.args";
import { LearnAPIResponse } from "./learning-api.types";

@Service()
class LearnAPI {
  // TODO: extend RESTConnector in shared
  baseURL: string;
  constructor() {
    // TODO: Configuration
    this.baseURL = "https://connect.unity.com/api/learn";
  }

  async getLearningContents(args: LearningContentArgs): Promise<LearnAPIResponse> {
    let response;
    const path = this.buildLearningContentEndpoint(args);
    try {
      response = await fetch(this.baseURL + path).then(res => {
        if (res.ok) {
          return res.json();
        }
      });
    } catch (e) {
      // TODO: LearnApi Error
      throw e;
    }
    return response;
  }

  private buildLearningContentFilter({ contentType, skillLevel, languages }: LearningContentArgs): string {
    return JSON.stringify([`t:${contentType}`, `sl:${skillLevel}`, languages.map(lang => `lang:${lang}`).join()]);
  }

  private buildLearningContentEndpoint(learningContentArgs: LearningContentArgs): string {
    const { skip, limit } = learningContentArgs;
    const filter = this.buildLearningContentFilter(learningContentArgs);

    return `/search?ob=recency&k=${filter}&page=${skip}&pageSize=${limit}`;
  }
}

export default LearnAPI;
