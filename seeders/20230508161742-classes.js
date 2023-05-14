"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Classes", [
      {
        class_id: 1,
        name: "Class 1",
      },
      {
        class_id: 2,
        name: "Class 2",
      },
      {
        class_id: 3,
        name: "Class 3",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
