import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Group from '../app/models/Group';
import Topic from '../app/models/Topic';
import Comment from '../app/models/Comment';
import CommentLikes from '../app/models/CommentsLikes';
import Notification from '../app/models/Notification';
import PublicationComment from '../app/models/PublicationComment';
import UserPublication from '../app/models/UserPublication';
import Friend from '../app/models/Friend';

const models = [
  User,
  File,
  Group,
  Topic,
  Comment,
  CommentLikes,
  Notification,
  PublicationComment,
  UserPublication,
  Friend,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
    return this;
  }
}

export default new Database();
