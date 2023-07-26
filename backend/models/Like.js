import { Schema, Types, model } from 'mongoose';

const likeSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: Types.ObjectId,
    ref: 'Post',
  },
  liked: {
    type: Boolean,
    default: false,
  },
});

export default model('Like', likeSchema);
