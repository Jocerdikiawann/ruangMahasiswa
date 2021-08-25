var express = require("express");
var router = express.Router();
const isImage = require("is-base64");
const base64 = require("base64-img");
const { Media } = require("../models");
const fs = require("fs");
//get data
router.get("/", async (req, res) => {
  const media = await Media.findAll({ attributes: ["id", "image"] });
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

//post data
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

//delete data
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const media = await Media.findByPk(id);
  try {
    if (!media) {
      return res
        .status(404)
        .json({ status: "error", message: "Media not found" });
    }

    fs.unlink(`./public/${media.image}`, async (err) => {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }
      await media.destroy();
      return res.json({
        status: "succes",
        message: "image has been deleted",
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
