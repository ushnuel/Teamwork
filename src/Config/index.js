import 'dotenv/config';

const config = {};

switch (process.env.NODE_ENV) {
  case 'dev':
    config.PORT = process.env.PORT || 5000;
    config.DB = process.env.DB;
    break;
  case 'prod':
    config.PORT = process.env.PORT;
    config.DB = process.env.DATABASE_URL;
    break;
  default:
    config.PORT = process.env.PORT || 5000;
    config.DB = process.env.DB;
    break;
}
config.JWT_SECRET = process.env.JWT_SECRET;
config.CLOUDINARY = process.env.CLOUDINARY_URL;
config.ADMIN = process.env.ADMIN;
config.NODE_ENV = process.env.NODE_ENV;

export default config;
