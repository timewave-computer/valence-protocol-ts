// convert from 100000000 -> 1
export const microToBase = (
  amount: number | string,
  decimals: number
): number => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  amount = amount / Math.pow(10, decimals);
  return isNaN(amount) ? 0 : amount;
};

// convert from 1 -> 100000000
export const baseToMicro = (
  amount: number | string,
  decimals: number
): number => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  amount = amount * Math.pow(10, decimals);
  return isNaN(amount) ? 0 : amount;
};
