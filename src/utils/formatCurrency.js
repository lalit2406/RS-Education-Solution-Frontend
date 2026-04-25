// src/utils/formatCurrency.js

const formatCurrency = (amount = 0) => {
  const value = Number(amount);

  if (!value) return "₹0";

  if (value >= 100000) {
    const lakh = value / 100000;

    return `₹${parseFloat(lakh.toFixed(1))} Lakh / year`;
  }

  return `₹${value.toLocaleString("en-IN")} / year`;
};

export default formatCurrency;