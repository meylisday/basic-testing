import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 7, action: Action.Add })).toBe(13);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Multiply })).toBe(50);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Exponentiate })).toBe(
      36,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 12, b: 10, action: 123 })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'ffdsf', b: 'fsdfsadf', action: Action.Add }),
    ).toBeNull();
  });
});
