"use strict";
const { readFileSync } = require("fs");
const { resolve } = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const subjects = await JSON.parse(
      readFileSync(resolve("seeders", "json", "subject.json")),
      { encoding: "utf8" }
    );
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      await queryInterface.bulkInsert("Subjects", [
        {
          subject_id: i + 1,
          class_id: subject.class_id,
          name: subject.name,
          semester: subject.semester,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subjects", null, {});
  },
};
