import express from "express";
import routes from "../routes";
import {
  videos,
  videoUpload,
  videoDetail,
  videoEdit,
  videoDelete,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.videoUpload, videoUpload);
videoRouter.get(routes.videoEdit, videoEdit);
videoRouter.get(routes.videoDelete, videoDelete);

export default videoRouter;