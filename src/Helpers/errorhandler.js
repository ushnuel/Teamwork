export default class ErrorHandler extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
