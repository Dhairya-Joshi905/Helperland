'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        type: Sequelize.INTEGER
      },
      RatingFrom: {
        type: Sequelize.INTEGER
      },
      RatingTo: {
        type: Sequelize.INTEGER
      },
      Ratings: {
        type: Sequelize.FLOAT
      },
      Comments: {
        type: Sequelize.STRING
      },
      RatingDate: {
        type: Sequelize.DATE
      },
      IsApproved: {
        type: Sequelize.BOOLEAN
      },
      VisibleOnHomeScreen: {
        type: Sequelize.BOOLEAN
      },
      OnTimeArrival: {
        type: Sequelize.FLOAT
      },
      Friendly: {
        type: Sequelize.FLOAT
      },
      QualityOfService: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ratings');
  }
};