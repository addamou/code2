const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/caisses/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      "caisse" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({
  storage: storage,
});

module.exports = upload.single("document");
