'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      ServiceId: {
        type: Sequelize.INTEGER
      },
      ServiceStartDate: {
        type: Sequelize.DATE
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      ServiceFrequency: {
        type: Sequelize.SMALLINT
      },
      ServiceHourlyRate: {
        type: Sequelize.FLOAT
      },
      ServiceHours: {
        type: Sequelize.FLOAT
      },
      ExtraHours: {
        type: Sequelize.FLOAT
      },
      SubTotal: {
        type: Sequelize.FLOAT
      },
      Discount: {
        type: Sequelize.FLOAT
      },
      TotalCost: {
        type: Sequelize.FLOAT
      },
      Comments: {
        type: Sequelize.STRING
      },
      PaymentTransactionRefNo: {
        type: Sequelize.STRING
      },
      PaymentDue: {
        type: Sequelize.BOOLEAN
      },
      JobStatus: {
        type: Sequelize.SMALLINT
      },
      ServiceProviderId: {
        type: Sequelize.INTEGER
      },
      SPAcceptedDate: {
        type: Sequelize.DATE
      },
      HasPets: {
        type: Sequelize.BOOLEAN
      },
      Status: {
        type: Sequelize.INTEGER
      },
      ModifiedBy: {
        type: Sequelize.INTEGER
      },
      RefundedAmount: {
        type: Sequelize.FLOAT
      },
      Distance: {
        type: Sequelize.FLOAT
      },
      HasIssue: {
        type: Sequelize.BOOLEAN
      },
      PaymentDone: {
        type: Sequelize.BOOLEAN
      },
      RecordVersion: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('ServiceRequests');
  }
};