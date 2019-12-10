import { Service } from "typedi";
import { LearningContentArgs } from "../../features/learning-content/schema/learning-content.args";
import { LearnAPIResponse } from "./learning-api.types";
import loggerFactory from "../../lib/logger";
import { RESTConnector } from "@lazy-graphql/shared";
import Configuration from "../../lib/configuration";

const { LEARN_API_URL } = Configuration;

@Service()
class LearnAPI extends RESTConnector {
  constructor() {
    super(LEARN_API_URL, loggerFactory.child({ module: "LearnAPI.is" }));
  }

  async getLearningContents(args: LearningContentArgs): Promise<LearnAPIResponse> {
    let response;
    const endpoint = this.buildLearningContentEndpoint(args);
    try {
      const { body } = await this.get<LearnAPIResponse>(endpoint, { context: { headers: { x: "foo" } } });
      response = body;
    } catch (e) {
      this.logger.error(e, "getLearningContents");
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
    const endpoint = `search?ob=recency&k=${filter}&page=${skip}&pageSize=${limit}`;

    this.logger.trace({ endpoint }, `getLearningContents endpoint`);

    return endpoint;
  }
}

export default LearnAPI;
