import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: "댓글 내용이 필요합니다."
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
