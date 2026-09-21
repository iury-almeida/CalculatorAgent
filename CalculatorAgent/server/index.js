const express = require('express');
const cors = require('cors');
const { calculate } = require('./calculator');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/calculate', (req, res) => {
  const { a, b, operator } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Both a and b must be numbers' });
  }

  if (!['+', '-', '*', '/'].includes(operator)) {
    return res.status(400).json({ error: 'Invalid operator. Must be one of: +, -, *, /' });
  }

  try {
    const result = calculate(a, b, operator);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* istanbul ignore next */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Calculator server running on port ${PORT}`);
  });
}

module.exports = { app };