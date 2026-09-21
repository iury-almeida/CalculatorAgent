const { calculate } = require('./calculator');

describe('calculate', () => {
  describe('addition', () => {
    test('adds two positive numbers', () => {
      expect(calculate(2, 3, '+')).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(calculate(-2, -3, '+')).toBe(-5);
    });

    test('adds positive and negative', () => {
      expect(calculate(5, -3, '+')).toBe(2);
    });

    test('adds decimals', () => {
      expect(calculate(0.1, 0.2, '+')).toBeCloseTo(0.3);
    });
  });

  describe('subtraction', () => {
    test('subtracts two positive numbers', () => {
      expect(calculate(5, 3, '-')).toBe(2);
    });

    test('subtracts negative numbers', () => {
      expect(calculate(-2, -3, '-')).toBe(1);
    });

    test('subtracts resulting in negative', () => {
      expect(calculate(2, 5, '-')).toBe(-3);
    });
  });

  describe('multiplication', () => {
    test('multiplies two positive numbers', () => {
      expect(calculate(3, 4, '*')).toBe(12);
    });

    test('multiplies by zero', () => {
      expect(calculate(5, 0, '*')).toBe(0);
    });

    test('multiplies negative numbers', () => {
      expect(calculate(-3, 4, '*')).toBe(-12);
    });
  });

  describe('division', () => {
    test('divides two positive numbers', () => {
      expect(calculate(10, 2, '/')).toBe(5);
    });

    test('divides resulting in decimal', () => {
      expect(calculate(7, 2, '/')).toBe(3.5);
    });

    test('throws on division by zero', () => {
      expect(() => calculate(5, 0, '/')).toThrow('Division by zero is not allowed');
    });
  });

  describe('invalid operator', () => {
    test('throws on invalid operator', () => {
      expect(() => calculate(1, 2, '%')).toThrow('Unknown operator: %');
    });

    test('throws on invalid operator string', () => {
      expect(() => calculate(1, 2, 'x')).toThrow('Unknown operator: x');
    });
  });
});