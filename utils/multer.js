import fs from "fs";
import multer from "multer";

// uploads 폴더가 없으면 생성
const uploadFolder = "public/uploads/";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // 파일 저장 경로 설정
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // 파일명 설정
  },
});

const upload = multer({ storage });

export default upload;
