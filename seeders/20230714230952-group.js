"use strict";
const { readFileSync } = require("fs");
const { resolve } = require("path");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = await JSON.parse(
      readFileSync(resolve("seeders", "json", "room.json")),
      { encoding: "utf8" },
    );
    let i = 1;
    await queryInterface.bulkInsert(
      "Groups",
      rooms.map(({ name, room_id }) => ({
        group_id: i++,
        room_id,
        name,
        picture_url: null,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
