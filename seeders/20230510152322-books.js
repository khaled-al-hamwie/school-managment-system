"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Books", [
      {
        subject_id: 1,
        name: "Math 1",
        version: 1,
        price: 99,
        description: "very good",
        pdf_link: "pdf.com",
      },
      {
        subject_id: 1,
        name: "Math 2",
        version: 2,
        price: 99,
        description: "very good",
        pdf_link: "pdf.com",
      },
      {
        subject_id: 1,
        name: "Math 3",
        version: 3,
        price: 99,
        description: "very good",
        pdf_link: "pdf.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
