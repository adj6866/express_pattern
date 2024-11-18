export class InternalServerErrorException extends Error {
  public httpCode: number;

  constructor(message: string) {
    super(message);
    this.httpCode = 500;
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
