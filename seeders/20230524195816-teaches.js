"use strict";
const { readFileSync } = require("fs");
const { resolve } = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const teaches = await JSON.parse(
      readFileSync(resolve("seeders", "json", "teache.json")),
      { encoding: "utf8" }
    );
    await queryInterface.bulkInsert("Teaches", teaches);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teaches", null, {});
  },
};
