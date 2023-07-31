import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: "String",
      required: true,
      unique: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    firstName: {
      type: "String",
      required: true,
    },
    lastName: {
      type: "String",
      required: true,
    },
    avatar: "String",
    bio: "String",
    status: {
      type: "String",
      enum: ["active", "inactive", "block"],
      default: "active",
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

const User = model("User", schema);

export default User;