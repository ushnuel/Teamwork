/* eslint-disable no-unused-vars */
export default class FeedbackHandler {
  static success(res, status = 200, data) {
    res.status(status).json({
      status: 'success',
      data,
    });
  }

  static error(err, req, res, next) {
    const { status = 400, message } = err;
    const error = message;
    console.log('Error', error);
    res.status(status).json({
      status: 'error',
      error,
    });
  }
}
