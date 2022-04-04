/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {BindingKey} from '@loopback/core';
import {
  TranslateService,
} from './services';

//service bindings
export namespace Bindings {
  export const TRANSLATOR = BindingKey.create<TranslateService>('services.translate-service');
}

