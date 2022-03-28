import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import user from "../api/database/models/user.js";

const seedUsers = async () => {
    const existingUsers = await user.find({});
    if (existingUsers.length) {
      console.log("Users already seeded!");
      return;
    }
      const newUsers = new Array(5).fill(0).map((_, index) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcryptjs.hashSync("password", 10),
        city:faker.address.city(),
        contact:faker.phone.phoneNumber()
    }))
    await user.create(newUsers);
    console.log("Users: ");
    console.table(NewUsers.map((user) => ({ ...user, password: "password" })));
  };
  export default async () => {
    await seedUsers();
  };