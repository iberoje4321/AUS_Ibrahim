import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';


/**
 * A simple controller to bounce back http requests
 */
export class HealthController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /health`
  @get('/health')
  health(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello World',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
