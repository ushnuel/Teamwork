import { Router } from 'express';
import multer from 'multer';
import GifController from '../Controllers/gif';
import { cloudinary } from '../Middlewares';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), cloudinary.upload, GifController.post);

export default router;
