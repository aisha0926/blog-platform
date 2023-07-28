import Tags from '../../models/Tags.js';

export default async function postTag(req, res) {
  try {
    const newTag = await Tags.create({
      name: req.body.tagname,
      postId: req.params.postId,
    });

    newTag
      ? res.status(200).send({ message: 'Successfuly saved tag', tag: newTag })
      : res.status(401).send({ message: 'Cannot save the tag' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
