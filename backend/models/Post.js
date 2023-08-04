import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const schema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: User,
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
    type: {
      type: "String",
      enum: ["normal", "shared"],
      default: "normal",
    },
    privacyType: {
      type: "String",
      enum: ["public", "private"],
      default: "public",
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