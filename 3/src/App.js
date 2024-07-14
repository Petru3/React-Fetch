import React, { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function fetchConversion() {
      if (amount === '') {
        setResult('Please enter an amount.');
        return;
      }

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        setResult(data.rates[toCurrency]);
      } catch (error) {
        setResult('An error occurred. Please try again.');
      }
    }

    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      
      <p>Output: {fromCurrency === toCurrency ? amount : (result !== null ? result : 'No conversion yet')}</p>
    </div>
  );
}
