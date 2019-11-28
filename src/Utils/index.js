import JWT from '../Middlewares/jwtHelper';
import { FeedbackHandler } from '../Helpers';

export default class Utils {
  static help(model, res, message, code) {
    let data = null;
    if (model && model.jobrole) {
      const payload = {
        status: model.jobrole,
        email: model.email,
        userId: model.id,
      };
      const token = JWT.createToken(payload);
      data = {
        token,
        message,
        userId: model.id,
        isAdmin: model.jobrole,
      };
      FeedbackHandler.success(res, code, data);
    } else if (Array.isArray(model)) {
      data = [...model];
      FeedbackHandler.success(res, code, data);
    } else {
      data = { message, ...model };
      FeedbackHandler.success(res, code, data);
    }
  }
}
