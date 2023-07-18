const bcryptjs = require("bcryptjs");

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.bulkInsert("Credentials", [
      {
        credential_id: 1,
        email: "testseeder1@test.com",
        user_name: "testseeder1",
        password: await bcryptjs.hash("12312121212121212345", 12),
      },
    ]);

    await queryInterface.bulkInsert("Managers", [
      {
        manager_id: 1,
        credential_id: 1,
        first_name: "khaled",
        middle_name: "middle",
        last_name: "manager",
        birth_day: "2000-01-20",
        gender: "m",
        nationality: "UK",
        phone_number: "0963351256",
        location: "some where in UK",
        salary: 40.2,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Managers", null, {});
    await queryInterface.bulkDelete("Credentials", null, {});
  },
};
