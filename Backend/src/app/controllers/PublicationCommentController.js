import PublicationComment from '../models/PublicationComment';
import UserPublication from '../models/UserPublication';

class PublicationCommentController {
  async create(req, res) {
    const { body, id } = req.body;
    const { publication_id } = req.params;

    console.log('id:', id);
    console.log('publication_id:', publication_id);

    try {
      console.log('chegou aqui no PublicationComment');
      const createPublicationComment = await PublicationComment.create({
        id: id,
        body,
        author_id: req.userId,
        publication_id: publication_id,
      });

      console.log('comentário de publicação criado:', createPublicationComment);

      return res.status(200).json(createPublicationComment);
    } catch (err) {
      console.log('error:', err);
      return res.status(400).json(err);
    }
  }
  async index(req, res) {
    const { publication_id } = req.params;
    try {
      const PublicationComments = await PublicationComment.findAll({
        where: { publication_id: publication_id },
        include: [
          {
            association: 'author',
            attributes: ['id', 'name'],
            include: {
              association: 'avatar',
            },
          },
        ],
      });

      console.log('comentários da publicação', PublicationComments);

      if (!PublicationComments) {
        return res.status(401).json({ msg: 'no one publication was found' });
      }
      return res.status(200).json(PublicationComments);
    } catch (err) {
      console.log('erro', err);
      return res.status(400).json({ msg: 'no one publication was found' });
    }
  }
}

export default new PublicationCommentController();
