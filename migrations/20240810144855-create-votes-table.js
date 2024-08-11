export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Votes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });

    // Add a unique index on categoryId and userId to prevent duplicate votes
    await queryInterface.addIndex("Votes", ["categoryId", "userId"], {
      unique: true,
      name: "votes_category_id_user_id",
    });

    // Add an index on userId for better query performance
    await queryInterface.addIndex("Votes", ["userId"]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Votes");
  },
};
