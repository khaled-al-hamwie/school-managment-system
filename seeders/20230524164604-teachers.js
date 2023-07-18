"use strict";

const { readFileSync } = require("fs");
const { resolve } = require("path");
const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const teacheres = await JSON.parse(
      readFileSync(resolve("seeders", "json", "teacher.json")),
      { encoding: "utf8" }
    );
    for (let i = 2; i < teacheres.length; i++) {
      const teacher = teacheres[i];
      await queryInterface.bulkInsert("Credentials", [
        {
          credential_id: i,
          email: teacher.email,
          user_name: teacher.user_name,
          password: await bcryptjs.hash("11111111", 12),
        },
      ]);
      await queryInterface.bulkInsert("Teachers", [
        {
          credential_id: i,
          teacher_id: i - 1,
          first_name: teacher.first_name,
          middle_name: teacher.middle_name,
          last_name: teacher.last_name,
          birth_day: teacher.birth_day,
          gender: teacher.gender,
          nationality: teacher.nationality,
          phone_number: teacher.phone_number,
          location: teacher.location,
          salary: teacher.salary,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teachers", null, {});
  },
};
