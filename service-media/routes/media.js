var express = require("express");
var router = express.Router();
const isImage = require("is-base64");
const base64 = require("base64-img");
const { Media } = require("../models");

router.get("/", async (req, res) => {
  const media = await Media.findAll();
  const mappedMedia = await media.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;
    return m;
  });
  try {
    return res.json({
      status: "succes",
      message: mappedMedia,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  const image = req.body.image;
  if (!isImage(image, { mimeRequired: true })) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Base64",
    });
  }
  base64.img(image, "./public/images", Date.now(), async (err, filepath) => {
    try {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }
      const filename = filepath.split("/").pop();
      const media = await Media.create({ image: `images/${filename}` });
      return res.json({
        status: "success",
        data: {
          id: media.id,
          image: `${req.get("host")}/images/${filename}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
