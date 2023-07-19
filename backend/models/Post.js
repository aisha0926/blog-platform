import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: "String",
      required: true,
    },
    content: {
      type: "String",
      required: true,
    },
    summary: "String",
    type: "String",
    privacyType: {
      type: "String",
      required: true,
    },
    deletedAt: {
      type: "Date",
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Post = model("Post", schema);

export default Post;
