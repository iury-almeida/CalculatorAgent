function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return a / b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

module.exports = { calculate };