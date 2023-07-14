"use strict";

const { readFileSync } = require("fs");
const { resolve } = require("path");
const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = await JSON.parse(
      readFileSync(resolve("seeders", "json", "teacher.json")),
      { encoding: "utf8" },
    );
    for (let i = 100; i < 100 + students.length; i++) {
      const student = students[i - 100];
      await queryInterface.bulkInsert("Credentials", [
        {
          credential_id: i,
          email: student.email,
          user_name:
            student.user_name + Math.floor(Math.random() * 10000).toString(),
          password: await bcryptjs.hash("11111111", 12),
        },
        {
          credential_id: i + students.length,
          email: student.email,
          user_name:
            student.user_name + Math.floor(Math.random() * 10000).toString(),
          password: await bcryptjs.hash("11111111", 12),
        },
      ]);
      await queryInterface.bulkInsert("Students", [
        {
          credential_id: i,
          student_id: i,
          first_name: student.first_name,
          father_name: student.middle_name,
          mother_name: student.middle_name,
          last_name: student.last_name,
          birth_day: student.birth_day,
          gender: student.gender,
          nationality: student.nationality,
          phone_number: student.phone_number,
          location: student.location,
          room_id: getRoom(i),
        },
        {
          credential_id: i + students.length,
          student_id: i + students.length,
          first_name: student.first_name,
          father_name: student.middle_name,
          mother_name: student.middle_name,
          last_name: student.last_name,
          birth_day: student.birth_day,
          gender: student.gender,
          nationality: student.nationality,
          phone_number: student.phone_number,
          location: student.location,
          room_id: getRoom(i + students.length),
        },
      ]);
      await queryInterface.bulkInsert("Records", [
        {
          record_id: i,
          class_id:
            (getRoom(i) == 4) | (getRoom(i) == 5) | (getRoom(i) == 6) ? 8 : 9,
          student_id: i,
          year: "2023/2024",
        },
        {
          record_id: i + students.length,
          class_id:
            (getRoom(i + students.length) == 4) |
            (getRoom(i + students.length) == 5) |
            (getRoom(i + students.length) == 6)
              ? 8
              : 9,
          student_id: i + students.length,
          year: "2023/2024",
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
    await queryInterface.bulkDelete("Students", null, {});
  },
};

function getRoom(i) {
  const a = i % 6;
  let room_id = 4;
  switch (a) {
    case 2:
      room_id = 5;
      break;
    case 3:
      room_id = 6;
      break;
    case 4:
      room_id = 7;
      break;
    case 5:
      room_id = 8;
      break;
    case 0:
      room_id = 9;
      break;
    default:
      room_id = 4;
      break;
  }
  return room_id;
}
