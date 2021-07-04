const path = require("path");
const fs = require("fs/promises");

const multer = require("multer");

const jimp = require("jimp");
const { read } = require("fs");

const { users: service } = require("../../services");

const tempDir = path.join(process.cwd(), "tmp");

const uploadDir = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage,
});

const avatar = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const description = req.body;
  const id = req.user.id;

  const fileName = path.join(uploadDir, originalname);

  try {
    const img = await jimp.read(tempName);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempName);

    const oldAvatar = await service.getAwatar(id);

    if (oldAvatar) {
      await fs.unlink(oldAvatar);
    }

    await fs.rename(tempName, fileName);

    await service.updateAwatar(id, fileName);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          avatarURL: fileName,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempName);
    next(error);
  }
};

module.exports = {
  upload,
  avatar,
};
