import multer, { diskStorage } from "multer"; // Importer multer
import * as path from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, './public/carIcons')
  },
  filename: function (_request, file, callback) {
    callback(null, "IMAGE_" + Date.now() + path.extname(file.originalname))
  }
})

module.exports = multer({ storage: storage })