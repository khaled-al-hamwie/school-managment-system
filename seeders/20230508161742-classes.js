"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Classes", [
      {
        class_id: 1,
        name: "Class 1",
        number_of_lectures: 10,
        lecture_length: 60,
        rest_length: 10,
      },
      {
        class_id: 2,
        name: "Class 2",
        number_of_lectures: 12,
        lecture_length: 45,
        rest_length: 15,
      },
      {
        class_id: 3,
        name: "Class 3",
        number_of_lectures: 8,
        lecture_length: 90,
        rest_length: 20,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
