const mockRes = require('jest-mock-express').response;
const auth = require('../src/middleware/auth');

describe('test auth middleware', () => {
  it('should return 401 error if no Authorization header', async () => {
    expect.assertions(2);
    const req = { header: jest.fn() };
    const res = mockRes();
    const next = jest.fn();
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'Not authorized to access this resource' });
  });
  it('should return 401 error if Authorization header is not valid', async () => {
    expect.assertions(2);
    const req = {
      header: jest.fn((header) => {
        if (header === 'Authorization') {
          return 'Bearer 1';
        }
        return '';
      }),
    };
    const res = mockRes();
    const next = jest.fn();
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'Wrong auth token' });
  });
});
