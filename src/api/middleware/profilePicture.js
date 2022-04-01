import  multer  from "multer" //multer is required for file upload
import path, { dirname } from "path";
import { fileURLToPath } from "url";
global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);


const uploadPath = path.join(__dirname, "../../assets", "/uploads");

const storage = multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      try{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
      }catch(err){
        console.log("error")
      }
    }
  })
  export const upload =multer({storage:storage})
