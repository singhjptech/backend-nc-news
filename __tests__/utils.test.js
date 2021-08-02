const { mapTopic, mapUsers } = require('../db/utils/data-manipulation');

describe('mapTopic()', () => {
  test('should return an array', () => {
    const input = [];
    const actualOutput = mapTopic(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });
  test('should not mutate the input array ', () => {
    const input = [];
    expect(mapTopic(input)).not.toBe(input);
  });
  test('should return an array with length equal to object keys in input array', () => {
    const input = [{ description: 'FOOTIE!', slug: 'football' }];
    const expectedOutput = ['football', 'FOOTIE!'];
    expect(mapTopic(input)).toEqual(expectedOutput);
    // expect(expectedOutput).toHaveLength()
  });

});
