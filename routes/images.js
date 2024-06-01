const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer();

// Upload image
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Replace image
router.post('/replace/:id', upload.single('image'), imageController.replaceImage);

// View image
router.get('/view/:id', imageController.viewImage);

module.exports = router;
