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
  // rounds to remove floating point inaccuracies - e.g., 8.029409 * 10**6 resulting in 8029409.000000001 instead of 8029409
  amount = Math.round(amount * Math.pow(10, decimals));
  return isNaN(amount) ? 0 : amount;
};
