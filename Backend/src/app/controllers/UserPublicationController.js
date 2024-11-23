import UserPublication from '../models/UserPublication';

class UserPublicationController {
  async create(req, res) {
    const { body, id } = req.body;

    console.log('body', body);

    try {
      const publicationCreated = await UserPublication.create({
        id: id,
        body,
        user_id: req.userId,
      });

      console.log('publicação criada:', publicationCreated);

      return res.status(200).json(publicationCreated);
    } catch (err) {
      console.log('error:', err);
      return res.status(400).json(err);
    }
  }
  async index(req, res) {
    try {
      const userPublications = await UserPublication.findAll({
        where: { user_id: req.userId },
        include: [
          {
            association: 'author',
            attributes: ['id', 'name'],

            include: [
              {
                association: 'avatar',
                attributes: ['id', 'path'],
              },
            ],
          },
          {
            association: 'publication_comments',
          },
        ],
      });

      console.log('publicações do usuário', userPublications);

      if (!userPublications) {
        return res.status(401).json({ msg: 'no one publication was found' });
      }
      return res.status(200).json(userPublications);
    } catch (err) {
      console.log('erro', err);
      return res.status(400).json({ msg: 'no one publication was found' });
    }
  }
}

export default new UserPublicationController();
