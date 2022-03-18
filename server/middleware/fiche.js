const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/bulletins/");
  },

  filename: function (req, file, callback) {
    callback(
      null,
      "numeration" +
        "-" +
        Date.now() +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

let upload = multer({
  storage: storage,
});

module.exports = upload.single("fiche");
