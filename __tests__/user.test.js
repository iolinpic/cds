// const faker = require('faker');
const request = require('supertest');
const app = require('../src/app');


// const users = [
//   {
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   },
//   {
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   },
// ];
describe('user routes tests', () => {
  it('get /users, should response in 401 error due to lack of auth token', async () => {
    expect.assertions(1);
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(401);
  });
});
