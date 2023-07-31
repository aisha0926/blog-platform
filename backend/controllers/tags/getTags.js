import Tags from '../../models/Tags.js';

export default async function getTags(req, res) {
  try {
    const tags = await Tags.find({});

    console.log(tags);

    tags
      ? res.status(200).send({ message: 'Retrieved all tags', tags: tags })
      : res.status(404).send({ message: 'Cannot retrieve tags' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
