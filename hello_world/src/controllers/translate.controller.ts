// Uncomment these imports to begin using these cool features!
import {
  get, param, post, put,

  requestBody, Response, RestBindings
} from '@loopback/rest';
import { inject } from "@loopback/core";
import {Bindings} from '../keys';
import { TranslateService } from "../services";

// import {inject} from '@loopback/core';


export class TranslateController {
  constructor(
    @inject(Bindings.TRANSLATOR) public translateService: TranslateService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,

  ) {}

  @get('/translate/{language}')
  async getTranslation(
    @param.path.string('language') language:string
  ) {
    this.response.setHeader('content-type', 'text/html; charset=utf-8');
    this.response.send( this.translateService.translate(language.toLowerCase()));
  }
}
