import { Schema, Types, model } from 'mongoose';

const tagSchema = new Schema({
  name: {
    type: 'String',
    default: 'webdev',
  },
  postId: [
    {
      type: Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export default model('Tag', tagSchema);
