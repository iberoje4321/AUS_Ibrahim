import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { constants } from 'buffer';
import * as world from '../constants/holamundo';

@injectable({scope: BindingScope.TRANSIENT})
export class TranslateService {
  mundo:Map<string,any> = new Map();

  constructor(/* Add @inject to inject parameters */) {
    
    for(const lang of world.languages) {
      this.mundo.set(lang.language.toLowerCase(), lang.text);
    }

  }

  public translate(language:string):string {
    if(this.mundo.has(language))
      return this.mundo.get(language);
    else
      return `Sorry, I don't know that one!`;
  }


}
