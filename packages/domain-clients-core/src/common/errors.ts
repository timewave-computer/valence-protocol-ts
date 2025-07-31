export enum ClientErrorType {
  InvalidClient = 'InvalidClient',
  InvalidAddress = 'InvalidAddress',
  InvalidSigner = 'InvalidSigner'
}

export class ClientError extends Error {
  constructor(type: ClientErrorType, message: string) {
    super(message);
    this.name = type;
    this.stack = new Error().stack;
  }
}