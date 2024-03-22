import {
  MockInstance, // utility for "mocking" a function, so we can control what it returns
  afterEach, // a block that runs after every test case
  beforeEach, // a block that runs before every test case
  describe, // a block that organizes groups of tests
  expect, // a function for testing/asserting a value is what we think it is
  it, // the test block
  vi, // utility for spying and mocking (and restoring mocks and spies)
} from 'vitest';
import { editToDo } from './update';

describe('update', () => {
  describe('editToDo', () => {
    let fetchSpy: MockInstance;
    let testData = { test: 'data' };

    beforeEach(() => {
      fetchSpy = vi.spyOn(window, 'fetch');
    });

    afterEach(() => {
      // clean up that
      // puts Math.random back to normal
      // (in case other tests elsewhere need to use its original form)
      vi.restoreAllMocks();
    });

    it('should make a fetch request', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: () => new Promise((resolve) => resolve(testData)),
      });

      await editToDo('testId', {
        title: 'testTitle',
        description: 'testDescription',
      });

      const request = fetchSpy.mock.lastCall![0] as Request;

      expect(request.url).toEqual('http://localhost:3000/todos/testId');
      expect(request.method).toEqual('PATCH');
      expect(await new Response(request.body).json()).toEqual({
        description: 'testDescription',
        title: 'testTitle',
      });
    });
  });
});
