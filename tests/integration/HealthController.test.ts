// @ts-ignore
import { default as chaiHttp } from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../src/app';

chai.use(chaiHttp);

describe('HealthController', () => {
  describe('health', () => {
    it('should return 200 OK', async () => {
      const response = await chai.request(app).get('/health');
      expect(response.status).to.be.equals(200);
    });
  });
});
