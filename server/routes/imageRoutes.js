import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const Imagerouter = express.Router();

Imagerouter.post('/generate-image', userAuth,  generateImage);

export default Imagerouter;