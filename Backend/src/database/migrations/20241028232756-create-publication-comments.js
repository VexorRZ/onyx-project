module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('publication_comments', {
      id: {
        type: Sequelize.INTEGER,
        // type: Sequelize.STRING,
        // defaultValue: Sequelize.STRING(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        // type: Sequelize.STRING,
        // defaultValue: Sequelize.STRING(),
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      publication_id: {
        type: Sequelize.INTEGER,
        // type: Sequelize.STRING,
        // defaultValue: Sequelize.STRING(),
        allowNull: false,
        references: { model: 'user_publications', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('publication_comments');
  },
};
