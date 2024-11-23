import { Model, Sequelize } from 'sequelize';

class UserPublication extends Model {
  static init(sequelize) {
    super.init(
      {
        body: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'user_publications',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.hasMany(models.PublicationComment, {
      foreignKey: 'publication_id',
      as: 'publication_comments',
    });
  }
}

export default UserPublication;
