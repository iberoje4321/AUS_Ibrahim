import {Client, expect} from '@loopback/testlab';
import {HelloWorldApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HealthController', () => {
  let app: HelloWorldApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /health', async () => {
    const res = await client.get('/health?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
