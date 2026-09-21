import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Calculator from './Calculator.vue';

describe('Calculator.vue', () => {
  let wrapper;
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    wrapper = mount(Calculator);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const clickButton = async (text) => {
    const button = wrapper.findAll('button').find((b) => b.text() === text);
    if (button) {
      await button.trigger('click');
      await flushPromises();
    }
  };

  const getDisplay = () => wrapper.find('.display').text();

  it('renders calculator with display showing 0', () => {
    expect(getDisplay()).toBe('0');
  });

  it('displays numbers when number buttons are clicked', async () => {
    await clickButton('7');
    expect(getDisplay()).toBe('7');

    await clickButton('5');
    expect(getDisplay()).toBe('75');
  });

  it('clears display when C button is clicked', async () => {
    await clickButton('5');
    await clickButton('3');
    expect(getDisplay()).toBe('53');

    await clickButton('C');
    expect(getDisplay()).toBe('0');
  });

  it('handles decimal point', async () => {
    await clickButton('5');
    await clickButton('.');
    expect(getDisplay()).toBe('5.');

    await clickButton('2');
    expect(getDisplay()).toBe('5.2');
  });

  it('does not allow multiple decimal points', async () => {
    await clickButton('5');
    await clickButton('.');
    await clickButton('.');
    expect(getDisplay()).toBe('5.');
  });

  describe('addition', () => {
    it('performs addition via API', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 12 }),
      });

      await clickButton('7');
      await clickButton('+');
      await clickButton('5');
      await clickButton('=');

      expect(fetchMock).toHaveBeenCalledWith('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 7, b: 5, operator: '+' }),
      });
      expect(getDisplay()).toBe('12');
    });

    it('shows error for failed addition', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      });

      await clickButton('5');
      await clickButton('+');
      await clickButton('3');
      await clickButton('=');

      expect(getDisplay()).toBe('Error');
      expect(wrapper.find('.error-message').text()).toBe('Server error');
    });
  });

  describe('subtraction', () => {
    it('performs subtraction via API', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 3 }),
      });

      await clickButton('8');
      await clickButton('−');
      await clickButton('5');
      await clickButton('=');

      expect(fetchMock).toHaveBeenCalledWith('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 8, b: 5, operator: '-' }),
      });
      expect(getDisplay()).toBe('3');
    });
  });

  describe('multiplication', () => {
    it('performs multiplication via API', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 20 }),
      });

      await clickButton('4');
      await clickButton('×');
      await clickButton('5');
      await clickButton('=');

      expect(fetchMock).toHaveBeenCalledWith('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 4, b: 5, operator: '*' }),
      });
      expect(getDisplay()).toBe('20');
    });
  });

  describe('division', () => {
    it('performs division via API', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 2.5 }),
      });

      await clickButton('5');
      await clickButton('÷');
      await clickButton('2');
      await clickButton('=');

      expect(fetchMock).toHaveBeenCalledWith('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 5, b: 2, operator: '/' }),
      });
      expect(getDisplay()).toBe('2.5');
    });

    it('shows error for division by zero', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Division by zero is not allowed' }),
      });

      await clickButton('5');
      await clickButton('÷');
      await clickButton('0');
      await clickButton('=');

      expect(getDisplay()).toBe('Error');
      expect(wrapper.find('.error-message').text()).toBe('Division by zero is not allowed');
    });
  });

  it('chains operations correctly', async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: 12 }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: 14 }) });

    await clickButton('7');
    await clickButton('+');
    await clickButton('5');
    await clickButton('=');
    expect(getDisplay()).toBe('12');

    await clickButton('+');
    await clickButton('2');
    await clickButton('=');
    expect(getDisplay()).toBe('14');
  });

  it('handles network error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    await clickButton('5');
    await clickButton('+');
    await clickButton('3');
    await clickButton('=');

    expect(getDisplay()).toBe('Error');
    expect(wrapper.find('.error-message').text()).toBe('Network error');
  });

  it('handles error in handleOperatorClick when calculate throws', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Calculation failed'));

    await clickButton('5');
    await clickButton('+');
    await clickButton('3');
    await clickButton('×');

    expect(getDisplay()).toBe('Error');
    expect(wrapper.find('.error-message').text()).toBe('Calculation failed');
  });

  it('handles equals click when no operator is set', async () => {
    await clickButton('5');
    await clickButton('=');
    expect(getDisplay()).toBe('5');
  });

  it('handles equals click when waiting for second operand', async () => {
    await clickButton('5');
    await clickButton('+');
    await clickButton('=');
    expect(getDisplay()).toBe('5');
  });

  it('handles decimal click when waiting for second operand', async () => {
    await clickButton('5');
    await clickButton('+');
    await clickButton('.');
    expect(getDisplay()).toBe('0.');
  });

  it('handles decimal click when display already has decimal', async () => {
    await clickButton('5');
    await clickButton('.');
    await clickButton('.');
    expect(getDisplay()).toBe('5.');
  });

  it('handles operator click when operator already set and waiting for second operand', async () => {
    await clickButton('5');
    await clickButton('+');
    await clickButton('×');
    expect(getDisplay()).toBe('5');
  });

  it('handles operator click after first operand with existing operator', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 8 }),
    });

    await clickButton('5');
    await clickButton('+');
    await clickButton('3');
    await clickButton('×');

    expect(fetchMock).toHaveBeenCalledWith('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 5, b: 3, operator: '+' }),
    });
    expect(getDisplay()).toBe('8');
  });
});