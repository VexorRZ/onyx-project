import UserPublication from '../models/UserPublication';

class UserPublicationController {
  async create(req, res) {
    const { body } = req.body;

    try {
      const publicationCreated = await UserPublication.create({
        id,
        body,
        author_id: req.userId,
      });

      return res.status(200).json(publicationCreated);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async index(req, res) {
    const userPublications = UserPublication.findAll({
      where: { author: req.userId },
    });

    if (!userPublications) {
      return res.status(401).json({ msg: 'no one publication was found' });
    }
  }
}

export default new UserPublicationController();
