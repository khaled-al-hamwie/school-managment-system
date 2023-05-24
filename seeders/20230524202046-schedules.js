"use strict";

const { readFileSync } = require("fs");
const { resolve } = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = await JSON.parse(
      readFileSync(resolve("seeders", "json", "room.json")),
      { encoding: "utf8" }
    );
    const lecturess = await JSON.parse(
      readFileSync(resolve("seeders", "json", "lecture.json")),
      { encoding: "utf8" }
    );
    let count1 = 1;
    let count2 = 1;
    let count3 = 0;
    let time = "";
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      await queryInterface.bulkInsert("Schedules", [
        {
          schedule_id: i + 1,
          room_id: room.room_id,
          title: room.name,
          lecture_length: 45,
          rest_length: 15,
          days_count: 5,
          is_current: true,
        },
      ]);
      for (let j = 0; j < 5; j++) {
        await queryInterface.bulkInsert("ScheduleDays", [
          {
            schedule_day_id: count1,
            schedule_id: i + 1,
            day: getDayName(j),
            start_time: "07:30",
            lecture_number: 6,
          },
        ]);
        time = "07:30";
        for (let z = 0; z < 8; z++) {
          if (z == 2 || z == 5) {
            await queryInterface.bulkInsert("Lectures", [
              {
                lecture_id: count2,
                schedule_day_id: count1,
                teach_id: null,
                start_time: time,
                is_rest: true,
                lecture_number: null,
              },
            ]);
            time = addTimes(time, "00:15");
            count2++;
          } else {
            console.info(count3);
            await queryInterface.bulkInsert("Lectures", [
              {
                lecture_id: count2,
                schedule_day_id: count1,
                teach_id: lecturess[count3].teach_id,
                start_time: time,
                is_rest: false,
                lecture_number: lecturess[count3].lecture_number,
              },
            ]);
            time = addTimes(time, "00:45");
            count2++;
            count3++;
          }
        }
        count1++;
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lectures", null, {});
    await queryInterface.bulkDelete("ScheduleDays", null, {});
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};

function getDayName(j) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[j];
}

function addTimes(time1, time2) {
  const minutes = timeToMins(time1) + timeToMins(time2);
  const hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  // Add leading zero if minutes are less than 10
  if (remainingMinutes < 10) {
    remainingMinutes = 0 + remainingMinutes;
  }

  return hours + ":" + remainingMinutes;
}

// Convert a time in hh:mm format to minutes
function timeToMins(time) {
  const b = time.split(":");
  return +b[0] * 60 + +b[1];
}
