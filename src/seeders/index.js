import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import user from "../api/database/models/adminModel.js";
const seedUsers = async () => {
    const existingUsers = await user.find({});
    if (existingUsers.length) {
      console.log("Users already seeded!");
      return;
    }
     //Create admin user using faker
      const newUsers = new Array(5).fill(0).map((_, index) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcryptjs.hashSync("password", 10), // static password 
        city:faker.address.city(),
        contact:faker.phone.phoneNumber(),
        profileImage:faker.image.avatar()
    }))
    await user.create(newUsers);
    console.log("Users: ");
    console.table(newUsers.map((user) => ({ ...user, password: "password" }))); // Print once while create admin user 
  };
  export default async () => {
    await seedUsers();
  };