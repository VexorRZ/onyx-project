import { Model, Sequelize } from 'sequelize';

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        sender_id: Sequelize.INTEGER,
        sender_name: Sequelize.STRING,
        receiver_id: Sequelize.INTEGER,
        receiver_name: Sequelize.STRING,
        group_id: Sequelize.INTEGER,
        group_name: Sequelize.STRING,
        topic_id: Sequelize.INTEGER,
        comment_id: Sequelize.INTEGER,
        topic_name: Sequelize.STRING,
        viewed: Sequelize.BOOLEAN,
        type: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'notifications',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id', as: 'sender' });
    this.belongsTo(models.User, { foreignKey: 'id', as: 'receiver' });
    this.belongsTo(models.Group, { foreignKey: 'id', as: 'group' });
    this.belongsTo(models.Topic, { foreignKey: 'id', as: 'topic' });
    this.belongsTo(models.Comment, { foreignKey: 'id', as: 'comment' });
  }
}

export default Notification;
