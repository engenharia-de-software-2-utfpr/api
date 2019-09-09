const supertest = require('supertest');
const app = require('../../app');
const models = require('../../models');

describe('report', () => {
  describe('get', () => {
    it('Retorna um array vazio', async () => {
      const response = await supertest(app).get('/api/report');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message: 'DATA_FOUND', data: [] });
    });

    it('Retorna alguns relatos', async () => {
      await models.Report.create([
        { description: 'foo' },
        { description: 'bar' },
      ]);

      const response = await supertest(app).get('/api/report');
      expect(response.status).toBe(200);
      expect(response.body.message).toStrictEqual('DATA_FOUND');
      expect(response.body.data).toHaveLength(2);
    });
  });
});
