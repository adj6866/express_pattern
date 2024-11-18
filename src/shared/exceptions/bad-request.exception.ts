export class BadRequestException extends Error {
  public httpCode: number;

  constructor(message: string) {
    super(message);
    this.httpCode = 400;
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
