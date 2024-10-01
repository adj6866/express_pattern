export class CustomErrorException extends Error {
  public httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
    Object.setPrototypeOf(this, CustomErrorException.prototype);
  }
}
