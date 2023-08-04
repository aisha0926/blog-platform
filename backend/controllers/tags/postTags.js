import Tags from '../../models/Tags.js';

export default async function postTag(req, res) {
  const { tagname } = req.body;
  // Ensure that each tagname ONLY exists ONCE per postId and should NOT be duplicated
  // Ensure that the postId is in a form of an array-
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
    } else {
      // if it doesn't exist add the tag
      // if it exists don't add the tag
      const findDuplicates = findTagName.postId.find((el) =>
        el.equals(req.params.postId)
      );

      if (!findDuplicates) {
        const addTag = await Tags.findByIdAndUpdate(
          findTagName._id,
          {
            $push: { postId: req.params.postId },
          },
          { new: true }
        );

        return addTag
          ? res
              .status(200)
              .send({ message: 'Tag successfully added', tag: addTag })
          : res
              .status(400)
              .send({ message: 'Cannot add tag, something went wrong' });
      }
    }

    return res
      .status(200)
      .send({ message: 'Found an existing tag', tag: findTagName });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}