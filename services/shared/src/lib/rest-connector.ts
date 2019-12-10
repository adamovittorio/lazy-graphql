import got, { Got, GotOptions, Response, HandlerFunction } from "got";
import { Logger } from "pino";
import { HttpError } from "./error";

export type RESTBody = Pick<GotOptions, "json">;
export type RESTContenxt = Pick<GotOptions, "context">;

export type Options = GotOptions;

// TODO: redis
const cache = new Map();

export class RESTConnector {
  private client: Got;
  logger: Logger;

  constructor(private readonly prefixUrl: string, logger: Logger, private readonly options?: GotOptions) {
    this.logger = logger;

    const responseHandler: HandlerFunction = (options, next) => {
      if (options.isStream) {
        return next(options);
      }

      return (async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response: any = await next(options);
          this.logger.trace({ ...response.timings }, `${response.url} result ${response.statusCode}`);
          return response;
        } catch (error) {
          throw new HttpError(error);
        }
      })();
    };

    this.client = got.extend({
      retry: 0,
      prefixUrl: prefixUrl,
      cache: cache,
      dnsCache: cache,
      responseType: "json",
      hooks: {
        beforeRequest: [
          options => {
            options.headers = options?.context?.headers ?? {};
          },
        ],
      },
      handlers: [responseHandler],
      ...options,
    });
  }

  async get<T>(endpoint: string, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.get<T>(endpoint, { context });
  }

  async post<T>(endpoint: string, body: RESTBody, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.post(endpoint, { json: body, context });
  }

  async put<T>(endpoint: string, body: RESTBody, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.put(endpoint, { json: body, context });
  }

  async patch<T>(endpoint: string, body: RESTBody, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.patch(endpoint, { json: body, context });
  }

  async head<T>(endpoint: string, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.head(endpoint, { context });
  }

  async delete<T>(endpoint: string, context?: RESTContenxt): Promise<Response<T>> {
    return this.client.delete(endpoint, { context });
  }
}
