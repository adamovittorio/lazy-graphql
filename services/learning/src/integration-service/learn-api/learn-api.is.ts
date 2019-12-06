import fetch from "node-fetch";
import { Service } from "typedi";
import { LearningContentArgs } from "../../features/learning-content/schema/learning-content.args";
import { LearnAPIResponse } from "./learning-api.types";
import loggerFactory, { Logger } from "../../lib/logger";

@Service()
class LearnAPI {
  // TODO: extend RESTConnector in shared
  baseURL: string;
  constructor(private readonly logger: Logger = loggerFactory.child({ module: "LearnAPI.is" })) {
    // TODO: Configuration
    this.baseURL = "https://connect.unity.com/api/learn";
  }

  async getLearningContents(args: LearningContentArgs): Promise<LearnAPIResponse> {
    let response;
    const endpoint = this.buildLearningContentEndpoint(args);
    try {
      response = await fetch(`${this.baseURL}${endpoint}`).then(async res => {
        this.logger.trace({ status: res.status, ok: res.ok }, `getLearningContents status`); // TODO: generalize trace logging for http calls in shared RESTConnector

        if (res.ok) {
          const parsed = await res.json();
          this.logger.trace(parsed, "getLearningContents response");
          return parsed;
        }
      });
    } catch (e) {
      this.logger.error(e, "getLearningContents error");
      throw e; // TODO: error handling
    }
    return response;
  }

  private buildLearningContentFilter({ contentType, skillLevel, languages }: LearningContentArgs): string {
    return JSON.stringify([`t:${contentType}`, `sl:${skillLevel}`, languages.map(lang => `lang:${lang}`).join()]);
  }

  private buildLearningContentEndpoint(learningContentArgs: LearningContentArgs): string {
    const { skip, limit } = learningContentArgs;
    const filter = this.buildLearningContentFilter(learningContentArgs);
    const endpoint = `/search?ob=recency&k=${filter}&page=${skip}&pageSize=${limit}`;

    this.logger.trace({ endpoint }, `getLearningContents endpoint`);

    return endpoint;
  }
}

export default LearnAPI;
