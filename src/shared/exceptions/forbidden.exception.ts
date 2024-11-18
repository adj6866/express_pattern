export class ForbiddenException extends Error {
  public httpCode: number;

  constructor(message: string) {
    super(message);
    this.httpCode = 403;
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
