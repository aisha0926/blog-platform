import Tags from '../../models/Tags.js';

export default async function postTag(req, res) {
  const { tagname } = req.body;

  try {
    const findTagName = await Tags.findOne({ name: tagname });

    if (!findTagName) {
      const newTag = await Tags.create({
        name: req.body.tagname,
        postId: req.params.postId,
      });

      return newTag
        ? res
            .status(200)
            .send({ message: 'Successfuly saved tag', tag: newTag })
        : res.status(401).send({ message: 'Cannot save the tag' });
    }

    return res
      .status(200)
      .send({ message: 'Found an existing tag', tag: findTagName });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
