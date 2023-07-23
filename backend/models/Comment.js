import { Schema, Types, model } from 'mongoose';

const commentSchema = Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: Types.ObjectId,
    ref: 'Post',
  },
  content: {
    type: String,
    required: true,
  },
  timestamps: {
    deletedAt: true,
    updatedAt: true,
  },
});

export default model('Comment', commentSchema);
