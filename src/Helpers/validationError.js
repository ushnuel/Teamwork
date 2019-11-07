import { validationResult } from 'express-validator';

const validate = (req) => {
  const errors = validationResult(req);
  let message;
  if (!errors.isEmpty()) {
    message = errors.array()[0].msg;
  }
  return message;
};

export default validate;
