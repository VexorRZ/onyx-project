import { Model, Sequelize } from 'sequelize';

class PublicationComment extends Model {
  static init(sequelize) {
    super.init(
      {
        body: Sequelize.STRING,
        author_id: Sequelize.INTEGER,
        publication_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'publication_comments',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });

    this.belongsTo(models.UserPublication, {
      foreignKey: 'publication_id',
      as: 'publication',
    });
  }
}

export default PublicationComment;
