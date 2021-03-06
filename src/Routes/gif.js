import { Router } from 'express';
import multer from 'multer';
import GifController from '../Controllers/gif';
import { cloudinary } from '../Middlewares';

const router = Router();
const storage = multer.memoryStorage();
const uploadImage = multer({ storage }).single('image');

router.post('/', uploadImage, cloudinary.upload, GifController.createGif);
router.delete('/:gifId', GifController.delete);
router.get('/:gifId', GifController.get);

export default router;
