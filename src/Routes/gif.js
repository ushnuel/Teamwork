import { Router } from 'express';
import multer from 'multer';
import GifController from '../Controllers/gif';
import { cloudinary } from '../Middlewares';

const router = Router();
const storage = multer.memoryStorage();
const uploadImage = multer({ storage }).single('image');

router.post('/', uploadImage, cloudinary.upload, GifController.post);
router.delete('/:gifId', GifController.delete);

export default router;
