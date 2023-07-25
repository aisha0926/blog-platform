import { Schema, Types, model } from "mongoose";

const commentSchema = Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
    },
    content: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", commentSchema);
