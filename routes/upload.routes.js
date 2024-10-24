// in routes/upload.routes.js

const router = require("express").Router();

const uploader = require("../middlewares/cloudinary.config.js");

// POST "/api/upload"
router.post("/media", uploader.single("image"), (req, res, next) => {
  console.log("i'm here!");

  if (!req.file) {
    // this will happend if cloudinary rejects the image for any reason
    res.status(400).json({
      errorMessage: "There was a problem uploading the image. Check image format and size."
    })
    return;
  }

  // get the URL of the uploaded file and send it as a response.
  // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend (response.data.imageUrl)

  
  res.json({ imageUrl : req.file.path });
});

module.exports = router;