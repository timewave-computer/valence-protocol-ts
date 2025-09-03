/**
 * Convert from micro (integer, bigint) to base (decimal string).
 * Example: 100000000n with decimals=8 -> "1"
 */
export function microToBase(amount: bigint | string, decimals: number): string {
  const bigAmount = typeof amount === 'string' ? BigInt(amount) : amount;
  const divisor = BigInt(10) ** BigInt(decimals);

  const whole = bigAmount / divisor;
  const fraction = bigAmount % divisor;

  if (fraction === BigInt(0)) {
    return whole.toString();
  }

  // pad fractional part with leading zeros
  const fractionStr = fraction.toString().padStart(decimals, '0');

  // remove trailing zeros for a cleaner string
  const fractionTrimmed = fractionStr.replace(/0+$/, '');

  return `${whole.toString()}.${fractionTrimmed}`;
}

/**
 * Convert from base (decimal string/number) to micro (bigint).
 * Example: "1.2345" with decimals=6 -> 1234500n
 */
export function baseToMicro(amount: string | number, decimals: number): bigint {
  const [wholeStr, fracStr = ''] = String(amount).split('.');

  const whole = BigInt(wholeStr);
  const frac = BigInt(fracStr.padEnd(decimals, '0').slice(0, decimals));

  return whole * BigInt(10) ** BigInt(decimals) + frac;
}
