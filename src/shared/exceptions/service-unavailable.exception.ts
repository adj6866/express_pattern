export class ServiceUnavailableException extends Error {
  public httpCode: number;

  constructor(message: string) {
    super(message);
    this.httpCode = 500;
    Object.setPrototypeOf(this, ServiceUnavailableException.prototype);
  }
}
