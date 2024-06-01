const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
    unique: true
  },
  imageData: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', ImageSchema);
