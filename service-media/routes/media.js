var express = require("express");
var router = express.Router();
const isImage = require("is-base64");
const base64 = require("base64-img");
const { Media } = require("../models/media");

router.post("/", function (req, res, next) {
  const image = req.body.image;
  if (!isImage(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }

  base64.img(image, "./public/images", Date.now(), async (err, filepath) => {
    try {
      const filename = filepath.split("/").pop();
      const media = await Media.create({ images: `images/${filename}` });
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      } else {
        return res.json({
          status: "success",
          data: {
            id: media.id,
            images: `${req.get("host")}/images/${filename}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
