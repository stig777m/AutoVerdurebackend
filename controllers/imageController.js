const Image = require('../models/Image');

// Upload a new image
exports.uploadImage = async (req, res) => {
  const { imageId } = req.body;
  const imageData = req.file.buffer;
  const contentType = req.file.mimetype;

  try {
    const newImage = new Image({
      imageId,
      imageData,
      contentType
    });

    await newImage.save();
    res.status(201).send('Image uploaded successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Replace an existing image
exports.replaceImage = async (req, res) => {
  const { id } = req.params;
  const imageData = req.file.buffer;
  const contentType = req.file.mimetype;

  try {
    const updatedImage = await Image.findOneAndUpdate(
      { imageId: id },
      { imageData, contentType },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).send('Image not found');
    }

    res.send('Image replaced successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// View an image
exports.viewImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findOne({ imageId: id });

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', image.contentType);
    res.send(image.imageData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
