import dotenv from "dotenv";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import routes from "./routes";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const multerVideo = multer({
  storage: multerS3({
    // default storage는 node.js의 파일 시스템, 이 경우는 multerS3
    s3,
    acl: "public-read",
    bucket: "clone-youtube/videos" // access control list
  })
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "clone-youtube/avatars"
  })
});

// const multerVideo = multer({ dest: "uploads/videos/" }); // 유저가 동영상을 업로드하면 서버에 있는 folder(video/)에 업로드
// const multerAvatar = multer({ dest: "uploads/avatars/" });

export const uploadVideo = multerVideo.single("videoFile"); // single : 오직 하나의 파일만 upload, Name part는 videoUpload.pug의 file의 name="videoFile"에서 온 것
export const uploadAvatar = multerAvatar.single("avatar"); // Name part는 editProfile.pug의 file의 name="avatar"에서 온 것

export const localsMiddleware = (req, res, next) => {
  // locals를 추가한다. locals가 추가되면 템플릿, 컨트롤러 등 어디에서든 사용 가능
  res.locals.siteName = "YouTube";
  res.locals.routes = routes; // routes 객체 추가 : 이후 링크주소로 routes.signup 이런식으로 사용 가능
  res.locals.loggedUser = req.user || null; // 템플릿이 user에 접근할 수 있도록
  next(); // 미들웨어가 next에 req를 전달해야 한다. app.js에서는 미들웨어가(localsMiddleware) 커넥션과 라우트들 사이에 있으니까 next()
};

export const onlyPublic = (req, res, next) => {
  // req.user가 존재하면 (사용자가 로그인 된 상태라면) 그 이후의 컨트롤러에는 접근하지 못하도록
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
