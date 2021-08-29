"use strict";
const bcrypt = require("bcrypt");
const faker = require("faker");

var randomName = faker.name.findName();
var randomJOb = faker.name.jobTitle();
//validation error jika menggunakan faker.email
// var randomEmail = faker.internet.email();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: randomName,
        profession: randomJOb,
        role: "admin",
        email: "tes1@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: randomName,
        profession: randomJOb,
        role: "student",
        email: "tes2@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
