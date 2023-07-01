import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} of ${a} and ${b} correctly`, () => {
      const result = simpleCalculator({ a: a, b: b, action: action });
      expect(result).toBe(expected);
    });
  });
});
