import { Registration } from "./../node_modules/.prisma/client/index.d";
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();
import { hash } from "bcryptjs";

async function main() {
  await prisma.referral.deleteMany({});
  await prisma.point.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.confirmToken.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.receipt.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.attendee.deleteMany({});
  await prisma.eventReview.deleteMany({});
  await prisma.voucher.deleteMany({});
  await prisma.categoryEvent.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.wallet.deleteMany({});
  await prisma.user.deleteMany({});

  // Create seed data
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Alice Johnson",
        username: "alicej",
        password: await hash("password123", 10),
        email: "alice@example.com",
        role: "CUSTOMERS",
        referralNumber: "REF123",
        walletBalance: 100,
        emailConfirmed: true,
      },
      {
        name: "Bob Smith",
        username: "bobsmith",
        password: await hash("password456", 10),
        email: "bob@example.com",
        role: "ORGANIZERS",
        referralNumber: "REF456",
        walletBalance: 200,
        emailConfirmed: true,
      },
      {
        name: "Charlie Brown",
        username: "charlieb",
        password: await hash("password789", 10),
        email: "charlie@example.com",
        role: "CUSTOMERS",
        referralNumber: "REF789",
        walletBalance: 150,
        emailConfirmed: true,
      },
    ],
  });

  const user1 = await prisma.user.findFirst({ where: { username: "alicej" } });
  const user2 = await prisma.user.findFirst({
    where: { username: "bobsmith" },
  });
  const user3 = await prisma.user.findFirst({
    where: { username: "charlieb" },
  });

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Music",
        description: "Music events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        slug: "music",
      },
      {
        name: "Sports",
        description: "Sports events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        slug: "sports",
      },
      {
        name: "Tech",
        description: "Tech events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        slug: "tech",
      },
    ],
  });

  const category1 = await prisma.category.findFirst({
    where: { name: "Music" },
  });
  const category2 = await prisma.category.findFirst({
    where: { name: "Sports" },
  });
  const category3 = await prisma.category.findFirst({
    where: { name: "Tech" },
  });

  const events = await prisma.event.createMany({
    data: [
      {
        name: "Rock Concert",
        excerpt: "A night of rock music",
        description: "Enjoy the best rock bands in town",
        date: new Date("2023-10-15T20:00:00Z"),
        price: 50.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        location: "City Hall",
        availableSeats: 100,
        organizerId: user2.id,
        isFree: false,
        slug: "rock-concert",
      },
      {
        name: "Football Match",
        excerpt: "A thrilling football match",
        description: "Watch your favorite team play",
        date: new Date("2023-11-20T15:00:00Z"),
        price: 30.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        location: "Stadium",
        availableSeats: 500,
        organizerId: user2.id,
        isFree: false,
        slug: "football-match",
      },
      {
        name: "Tech Conference",
        excerpt: "Learn about the latest tech trends",
        description: "Join experts in the tech industry",
        date: new Date("2023-12-10T09:00:00Z"),
        price: 100.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        location: "Convention Center",
        availableSeats: 200,
        organizerId: user2.id,
        isFree: false,
        slug: "tech-conference",
      },
    ],
  });

  const event1 = await prisma.event.findFirst({
    where: { name: "Rock Concert" },
  });
  const event2 = await prisma.event.findFirst({
    where: { name: "Football Match" },
  });
  const event3 = await prisma.event.findFirst({
    where: { name: "Tech Conference" },
  });

  await prisma.categoryEvent.createMany({
    data: [
      { eventId: event1.id, categoryId: category1.id },
      { eventId: event2.id, categoryId: category2.id },
      { eventId: event3.id, categoryId: category3.id },
    ],
  });

  await prisma.referral.createMany({
    data: [
      { referredById: user1.id, referredUserId: user3.id },
      { referredById: user2.id, referredUserId: user1.id },
      { referredById: user3.id, referredUserId: user2.id },
    ],
  });

  await prisma.point.createMany({
    data: [
      {
        userId: user1.id,
        pointsEarned: 50,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user2.id,
        pointsEarned: 75,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user3.id,
        pointsEarned: 100,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
    ],
  });

  await prisma.coupon.createMany({
    data: [
      {
        code: "COUPON1",
        discount: 10,
        userId: user1.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON2",
        discount: 20,
        userId: user2.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON3",
        discount: 30,
        userId: user3.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
    ],
  });

  await prisma.confirmToken.createMany({
    data: [
      {
        userId: user1.id,
        token: "TOKEN1",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user2.id,
        token: "TOKEN2",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user3.id,
        token: "TOKEN3",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
    ],
  });

  await prisma.registration.createMany({
    data: [
      { userId: user1.id, eventId: event1.id },
      { userId: user2.id, eventId: event2.id },
      { userId: user3.id, eventId: event3.id },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        amount: 50.0,
        userId: user1.id,
        eventId: event1.id,
        registrationId: user1.id,
      },
      {
        amount: 30.0,
        userId: user2.id,
        eventId: event2.id,
        registrationId: user2.id,
      },
      {
        amount: 100.0,
        userId: user3.id,
        eventId: event3.id,
        registrationId: user3.id,
      },
    ],
  });

  const transactions = await prisma.transaction.findMany();

  await prisma.receipt.createMany({
    data: [
      {
        receiptCode: "RC1",
        receiptTotal: 50.0,
        transactionId: transactions[0].id,
      },
      {
        receiptCode: "RC2",
        receiptTotal: 30.0,
        transactionId: transactions[1].id,
      },
      {
        receiptCode: "RC3",
        receiptTotal: 100.0,
        transactionId: transactions[2].id,
      },
    ],
  });

  await prisma.attendee.createMany({
    data: [
      {
        eventId: event1.id,
        name: "Alice Johnson",
        email: "alice@example.com",
        hasPaid: true,
      },
      {
        eventId: event2.id,
        name: "Bob Smith",
        email: "bob@example.com",
        hasPaid: true,
      },
      {
        eventId: event3.id,
        name: "Charlie Brown",
        email: "charlie@example.com",
        hasPaid: true,
      },
    ],
  });

  await prisma.eventReview.createMany({
    data: [
      {
        eventId: event1.id,
        overallExperience: 5,
        qualityOfEvent: 4,
        suggestions: "Great event!",
      },
      {
        eventId: event2.id,
        overallExperience: 4,
        qualityOfEvent: 5,
        suggestions: "Very exciting!",
      },
      {
        eventId: event3.id,
        overallExperience: 5,
        qualityOfEvent: 5,
        suggestions: "Excellent!",
      },
    ],
  });

  await prisma.voucher.createMany({
    data: [
      {
        code: "VOUCHER1",
        discountRate: 10,
        stock: 100,
        eventId: event1.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER2",
        discountRate: 20,
        stock: 150,
        eventId: event2.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER3",
        discountRate: 30,
        stock: 200,
        eventId: event3.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
    ],
  });

  await prisma.wallet.createMany({
    data: [
      { userId: user1.id, balance: 100.0 },
      { userId: user2.id, balance: 200.0 },
      { userId: user3.id, balance: 150.0 },
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
