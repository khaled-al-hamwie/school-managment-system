"use strict";

const { readFileSync } = require("fs");
const { resolve } = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const classes = await JSON.parse(
      readFileSync(resolve("seeders", "json", "class.json")),
      { encoding: "utf8" }
    );

    const rooms = await JSON.parse(
      readFileSync(resolve("seeders", "json", "room.json")),
      { encoding: "utf8" }
    );
    await queryInterface.bulkInsert("Classes", classes);
    await queryInterface.bulkInsert("Rooms", rooms);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};
