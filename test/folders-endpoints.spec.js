const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');


describe('GET /folders/:id', () => {
  context('Given no folders in the database', () => {
    it('responds with 404', () => {
      const id = 123456;
      return supertest(app)
        .get(`/folders/${id}`)
        .expect(404);
    });
  });
});