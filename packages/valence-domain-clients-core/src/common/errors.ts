export enum ClientErrorType {
  InvalidClient = 'InvalidClient',
  InvalidAddress = 'InvalidAddress'
}

export type ClientError =
  | {
      type: ClientErrorType.InvalidClient;
      message: string;
    }
  | {
      type: ClientErrorType.InvalidAddress;
      message: string;
  }

/**
 * Utility to construct and throw a ClientError in a concise way.
 */
export function throwClientError(type: ClientErrorType, message: string): never {
  throw { type, message } as ClientError;
} 