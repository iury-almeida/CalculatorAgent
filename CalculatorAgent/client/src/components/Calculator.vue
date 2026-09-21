<script setup>
import { ref } from 'vue';

const display = ref('0');
const firstOperand = ref(null);
const operator = ref(null);
const waitingForSecondOperand = ref(false);
const error = ref('');

const calculate = async (a, b, op) => {
  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b, operator: op }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Calculation failed');
    }
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const handleNumberClick = (num) => {
  error.value = '';
  if (waitingForSecondOperand.value) {
    display.value = String(num);
    waitingForSecondOperand.value = false;
  } else {
    display.value = display.value === '0' ? String(num) : display.value + num;
  }
};

const handleOperatorClick = async (op) => {
  error.value = '';
  const inputValue = parseFloat(display.value);

  if (operator.value && waitingForSecondOperand.value) {
    operator.value = op;
    return;
  }

  if (firstOperand.value === null) {
    firstOperand.value = inputValue;
  } else if (operator.value) {
    try {
      const result = await calculate(firstOperand.value, inputValue, operator.value);
      display.value = String(result);
      firstOperand.value = result;
    } catch (err) {
      error.value = err.message;
      display.value = 'Error';
      firstOperand.value = null;
      operator.value = null;
      waitingForSecondOperand.value = false;
      return;
    }
  }

  waitingForSecondOperand.value = true;
  operator.value = op;
};

const handleEqualsClick = async () => {
  if (operator.value === null || firstOperand.value === null || waitingForSecondOperand.value) {
    return;
  }

  error.value = '';
  const inputValue = parseFloat(display.value);

  try {
    const result = await calculate(firstOperand.value, inputValue, operator.value);
    display.value = String(result);
    firstOperand.value = null;
    operator.value = null;
    waitingForSecondOperand.value = false;
  } catch (err) {
    error.value = err.message;
    display.value = 'Error';
    firstOperand.value = null;
    operator.value = null;
    waitingForSecondOperand.value = false;
  }
};

const handleClearClick = () => {
  display.value = '0';
  firstOperand.value = null;
  operator.value = null;
  waitingForSecondOperand.value = false;
  error.value = '';
};

const handleDecimalClick = () => {
  error.value = '';
  if (waitingForSecondOperand.value) {
    display.value = '0.';
    waitingForSecondOperand.value = false;
    return;
  }
  if (!display.value.includes('.')) {
    display.value += '.';
  }
};
</script>

<template>
  <div class="calculator">
    <div class="display-container">
      <div class="display" :class="{ error: error }">{{ display }}</div>
      <div class="error-message" v-if="error">{{ error }}</div>
    </div>
    <div class="buttons">
      <button class="btn clear" @click="handleClearClick">C</button>
      <button class="btn number" @click="() => handleNumberClick(7)">7</button>
      <button class="btn number" @click="() => handleNumberClick(8)">8</button>
      <button class="btn number" @click="() => handleNumberClick(9)">9</button>
      <button class="btn operator" @click="() => handleOperatorClick('/')">÷</button>
      <button class="btn number" @click="() => handleNumberClick(4)">4</button>
      <button class="btn number" @click="() => handleNumberClick(5)">5</button>
      <button class="btn number" @click="() => handleNumberClick(6)">6</button>
      <button class="btn operator" @click="() => handleOperatorClick('*')">×</button>
      <button class="btn number" @click="() => handleNumberClick(1)">1</button>
      <button class="btn number" @click="() => handleNumberClick(2)">2</button>
      <button class="btn number" @click="() => handleNumberClick(3)">3</button>
      <button class="btn operator" @click="() => handleOperatorClick('-')">−</button>
      <button class="btn number zero" @click="() => handleNumberClick(0)">0</button>
      <button class="btn decimal" @click="handleDecimalClick">.</button>
      <button class="btn operator" @click="() => handleOperatorClick('+')">+</button>
      <button class="btn equals" @click="handleEqualsClick">=</button>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}

.display-container {
  margin-bottom: 20px;
}

.display {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  font-size: 2.5rem;
  text-align: right;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  color: #333;
  min-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 2px solid #e9ecef;
}

.display.error {
  border-color: #dc3545;
  background: #fff5f5;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 8px;
  text-align: right;
  min-height: 20px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  background: #f8f9fa;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn.number {
  background: white;
}

.btn.number:hover {
  background: #f8f9fa;
}

.btn.operator {
  background: #e7f1ff;
  color: #0066cc;
}

.btn.operator:hover {
  background: #d0e4ff;
}

.btn.clear {
  background: #fff5f5;
  color: #dc3545;
}

.btn.clear:hover {
  background: #ffe0e0;
}

.btn.equals {
  background: #0066cc;
  color: white;
  grid-column: span 1;
}

.btn.equals:hover {
  background: #0052a3;
}

.btn.decimal {
  background: white;
}

.btn.zero {
  grid-column: span 2;
}

@media (max-width: 480px) {
  .calculator {
    padding: 15px;
    border-radius: 0;
    min-height: 100vh;
    box-shadow: none;
  }

  .display {
    font-size: 2rem;
    padding: 15px;
  }

  .btn {
    padding: 18px;
    font-size: 1.25rem;
  }
}
</style>