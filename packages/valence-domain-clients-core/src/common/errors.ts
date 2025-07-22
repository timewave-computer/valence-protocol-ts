export type ClientError =
  | {
      type: 'InvalidClient';
      message: string;
    }
  | {
      type: 'ConnectionError';
      message: string;
    }
  | {
      type: 'InvalidAddress';
      message: string;
    }
  | {
      type: 'QueryError';
      message: string;
    }
  | {
      type: 'ExecutionError';
      message: string;
    }
  | {
      type: 'SchemaValidationError';
      message: string;
    }
  | {
      type: 'UnknownError';
      message: string;
    };

/**
 * Utility to construct and throw a ClientError in a concise way.
 */
export function throwClientError(type: ClientError["type"], message: string): never {
  throw { type, message } as ClientError;
} 