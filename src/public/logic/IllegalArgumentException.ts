export default class IllegalArgumentException extends Error {

  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, IllegalArgumentException.prototype);
  }

  msg() {
    return this.message;
  }
}