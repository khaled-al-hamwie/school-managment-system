"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Subjects", [
      {
        subject_id: 1,
        name: "Mathematics",
        semester: 1,
        class_id: 1,
      },
      {
        subject_id: 2,
        name: "Physics",
        semester: 2,
        class_id: 2,
      },
      {
        subject_id: 3,
        name: "Chemistry",
        semester: 3,
        class_id: 3,
      },
      {
        subject_id: 4,
        name: "History",
        semester: 3,
        class_id: 3,
      },
      {
        subject_id: 5,
        name: "Geography",
        semester: 3,
        class_id: 3,
      },
      {
        subject_id: 6,
        name: "Social Studies",
        semester: 3,
        class_id: 3,
      },
      {
        subject_id: 7,
        name: "Physical Education",
        semester: 3,
        class_id: 3,
      },
      {
        subject_id: 8,
        name: "Art and Music",
        semester: 3,
        class_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subjects", null, {});
  },
};
