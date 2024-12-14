import { Model, Sequelize } from 'sequelize';

class Friend extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.STRING,
        friend_id: Sequelize.INTEGER,
        accepted: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users_friends',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
    this.hasMany(models.User, {
      foreignKey: 'id',
      as: 'friend',
    });
  }
}

export default Friend;
