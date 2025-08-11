// Safe JSON serialization that handles circular references
export const safeStringify = (obj: unknown, space?: number): string => {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]';
        }
        seen.add(value);
      }
      // Handle functions, symbols, and other non-serializable values
      if (typeof value === 'function') {
        return '[Function]';
      }
      if (typeof value === 'symbol') {
        return '[Symbol]';
      }
      return value;
    },
    space
  );
};
