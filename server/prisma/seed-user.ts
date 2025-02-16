const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();
import { hash } from "bcryptjs";

async function main() {
    const users = await prisma.user.createMany({
      data: [
        {
          name: "Diana Prince",
          username: "dianap",
          password: await hash("securepass1", 10),
          email: "diana@example.com",
          role: "ORGANIZERS",
          referralNumber: "REF101",
          walletBalance: 500000,
          emailConfirmed: true,
        },
        {
          name: "Edward Norton",
          username: "edwardn",
          password: await hash("securepass2", 10),
          email: "edward@example.com",
          role: "CUSTOMERS",
          referralNumber: "REF102",
          walletBalance: 600000,
          emailConfirmed: true,
        },
        {
          name: "Fiona Apple",
          username: "fionaapple",
          password: await hash("securepass3", 10),
          email: "fiona@example.com",
          role: "ORGANIZERS",
          referralNumber: "REF103",
          walletBalance: 700000,
          emailConfirmed: true,
        },
        {
          name: "George Clooney",
          username: "georgec",
          password: await hash("securepass4", 10),
          email: "george@example.com",
          role: "CUSTOMERS",
          referralNumber: "REF104",
          walletBalance: 800000,
          emailConfirmed: true,
        },
        {
          name: "Hannah Montana",
          username: "hannahm",
          password: await hash("securepass5", 10),
          email: "hannah@example.com",
          role: "ORGANIZERS",
          referralNumber: "REF105",
          walletBalance: 900000,
          emailConfirmed: true,
        },
        {
          name: "Ian McKellen",
          username: "ianm",
          password: await hash("securepass6", 10),
          email: "ian@example.com",
          role: "CUSTOMERS",
          referralNumber: "REF106",
          walletBalance: 500000,
          emailConfirmed: true,
        },
        {
          name: "Jasmine Lee",
          username: "jasminelee",
          password: await hash("securepass7", 10),
          email: "jasmine@example.com",
          role: "ORGANIZERS",
          referralNumber: "REF107",
          walletBalance: 600000,
          emailConfirmed: true,
        },
        {
          name: "Kevin Hart",
          username: "kevinhart",
          password: await hash("securepass8", 10),
          email: "kevin@example.com",
          role: "CUSTOMERS",
          referralNumber: "REF108",
          walletBalance: 700000,
          emailConfirmed: true,
        },
        {
          name: "Lily James",
          username: "lilyj",
          password: await hash("securepass9", 10),
          email: "lily@example.com",
          role: "ORGANIZERS",
          referralNumber: "REF109",
          walletBalance: 800000,
          emailConfirmed: true,
        },
        {
          name: "Michael Phelps",
          username: "michaelph",
          password: await hash("securepass10", 10),
          email: "michael@example.com",
          role: "CUSTOMERS",
          referralNumber: "REF110",
          walletBalance: 900000,
          emailConfirmed: true,
        },
      ],
    });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });