// Description: This file contains the unit tests for the followers routes.
// The unit tests include testing the following routes:
//
// GET / - Get all followers
// GET /:id - Get a follower by id
// POST / - Create a new follower
// PUT /:id - Update a follower
// DELETE /:id - Delete a follower
// The tests are written using the Jest testing framework and the Supertest library.

// To run the tests, run the following command:
// npm test
// The tests will run and output the results to the console.


const request = require('supertest');
// import the app
const app = require('../app');

// write the unit tests

describe('Followers routes', () => {
    it('should get all followers', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  
    it('should get a follower by id', async () => {
      const res = await request(app).get('/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  
    it('should create a new follower', async () => {
      const res = await request(app)
        .post('/')
        .send({
          name: 'Test Follower',


        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  
    it('should update a follower', async () => {
      const res = await request(app)
        .put('/1')
        .send({
          name: 'Updated Follower',

        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  
    it('should delete a follower', async () => {
      const res = await request(app).delete('/1');
      expect(res.statusCode).toEqual(204);
    });
  }
);
