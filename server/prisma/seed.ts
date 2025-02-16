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
  await prisma.receipt.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.attendee.deleteMany({});
  await prisma.eventReview.deleteMany({});
  await prisma.voucher.deleteMany({});
  await prisma.categoryEvent.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.wallet.deleteMany({});
  await prisma.user.deleteMany({});

  /* -------------------------------------------------------------------------- */
  /*                                 CREATE USER                                */
  /* -------------------------------------------------------------------------- */

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
        walletBalance: 120,
        emailConfirmed: true,
      },
      {
        name: "Fiona Apple",
        username: "fionaapple",
        password: await hash("securepass3", 10),
        email: "fiona@example.com",
        role: "ORGANIZERS",
        referralNumber: "REF103",
        walletBalance: 500000,
        emailConfirmed: true,
      },
      {
        name: "George Clooney",
        username: "georgec",
        password: await hash("securepass4", 10),
        email: "george@example.com",
        role: "CUSTOMERS",
        referralNumber: "REF104",
        walletBalance: 500000,
        emailConfirmed: true,
      },
      {
        name: "Hannah Montana",
        username: "hannahm",
        password: await hash("securepass5", 10),
        email: "hannah@example.com",
        role: "ORGANIZERS",
        referralNumber: "REF105",
        walletBalance: 500000,
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
        walletBalance: 500000,
        emailConfirmed: true,
      },
      {
        name: "Kevin Hart",
        username: "kevinhart",
        password: await hash("securepass8", 10),
        email: "kevin@example.com",
        role: "CUSTOMERS",
        referralNumber: "REF108",
        walletBalance: 500000,
        emailConfirmed: true,
      },
      {
        name: "Lily James",
        username: "lilyj",
        password: await hash("securepass9", 10),
        email: "lily@example.com",
        role: "ORGANIZERS",
        referralNumber: "REF109",
        walletBalance: 500000,
        emailConfirmed: true,
      },
      {
        name: "Michael Phelps",
        username: "michaelph",
        password: await hash("securepass10", 10),
        email: "michael@example.com",
        role: "CUSTOMERS",
        referralNumber: "REF110",
        walletBalance: 500000,
        emailConfirmed: true,
      },
    ],
  });

  const user1 = await prisma.user.findFirst({ where: { username: "dianap" } });
  const user2 = await prisma.user.findFirst({ where: { username: "edwardn" } });
  const user3 = await prisma.user.findFirst({
    where: { username: "fionaapple" },
  });
  const user4 = await prisma.user.findFirst({ where: { username: "georgec" } });
  const user5 = await prisma.user.findFirst({ where: { username: "hannahm" } });
  const user6 = await prisma.user.findFirst({
    where: { username: "ianm" },
  });
  const user7 = await prisma.user.findFirst({
    where: { username: "jasminelee" },
  });
  const user8 = await prisma.user.findFirst({
    where: { username: "kevinhart" },
  });
  const user9 = await prisma.user.findFirst({ where: { username: "lilyj" } });
  const user10 = await prisma.user.findFirst({
    where: { username: "michaelph" },
  });

  /* -------------------------------------------------------------------------- */
  /*                                 CREATE CATEGORY                            */
  /* -------------------------------------------------------------------------- */

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Music",
        description: "Music events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/music_lugjyz.jpg",
        slug: "music",
      },
      {
        name: "Sports",
        description: "Sports events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/sport_xs1jbc.jpg",
        slug: "sports",
      },
      {
        name: "Tech",
        description: "Tech events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/tech_fupcar.jpg",
        slug: "tech",
      },
      {
        name: "Food & Drink",
        description: "Food and drink events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/food_dudzkr.jpg",
        slug: "food-and-drink",
      },
      {
        name: "Arts & Culture",
        description: "Arts and culture events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627004/art_gyf6e6.jpg",
        slug: "arts-and-culture",
      },
      {
        name: "Film & TV",
        description: "Film and TV events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627004/film_epwaza.jpg",
        slug: "film-and-tv",
      },
      {
        name: "Travel & Adventure",
        description: "Travel and adventure events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/travel_lbpbtj.jpg",
        slug: "travel-and-adventure",
      },
      {
        name: "Health & Wellness",
        description: "Health and wellness events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627005/health_ei439o.jpg",
        slug: "health-and-wellness",
      },
      {
        name: "Education",
        description: "Education events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627004/education_yrdibk.jpg",
        slug: "education",
      },
      {
        name: "Community & Social",
        description: "Community and social events",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627004/community_bonnos.jpg",
        slug: "community-and-social",
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
  const category4 = await prisma.category.findFirst({
    where: { name: "Food & Drink" },
  });
  const category5 = await prisma.category.findFirst({
    where: { name: "Arts & Culture" },
  });
  const category6 = await prisma.category.findFirst({
    where: { name: "Film & TV" },
  });
  const category7 = await prisma.category.findFirst({
    where: { name: "Travel & Adventure" },
  });
  const category8 = await prisma.category.findFirst({
    where: { name: "Health & Wellness" },
  });
  const category9 = await prisma.category.findFirst({
    where: { name: "Education" },
  });
  const category10 = await prisma.category.findFirst({
    where: { name: "Community & Social" },
  });

  const events = await prisma.event.createMany({
    data: [
      {
        name: "Rock Concert",
        excerpt: "A night of rock music",
        description: "Join us for a night of rock music",
        date: new Date("2023-10-15T20:00:00Z"),
        price: 50000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627190/rock_dvucvj.jpg",
        location: "City Hall",
        availableSeats: 100,
        organizerId: user1.id,
        isFree: false,
        slug: "rock-concert",
      },
      {
        name: "Football Match",
        excerpt: "A thrilling football match",
        description: "Watch your favorite team play",
        date: new Date("2023-11-20T15:00:00Z"),
        price: 60000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627188/football_match_f8kac1.jpg",
        location: "Stadium",
        availableSeats: 500,
        organizerId: user3.id,
        isFree: false,
        slug: "football-match",
      },
      {
        name: "Tech Conference",
        excerpt: "Learn about the latest tech trends",
        description: "Join experts in the tech industry",
        date: new Date("2023-12-10T09:00:00Z"),
        price: 70000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627191/tech_hrqpsd.jpg",
        location: "Convention Center",
        availableSeats: 200,
        organizerId: user5.id,
        isFree: false,
        slug: "tech-conference",
      },
      {
        name: "Food Festival",
        excerpt: "A food festival",
        description: "Explore the world of food and culture",
        date: new Date("2024-01-15T20:00:00Z"),
        price: 80000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627188/food_jlcxks.jpg",
        location: "Convention Center",
        availableSeats: 300,
        organizerId: user7.id,
        isFree: false,
        slug: "food-festival",
      },
      {
        name: "Art Exhibition",
        excerpt: "An art exhibition",
        description: "Discover the world of art",
        date: new Date("2024-02-20T15:00:00Z"),
        price: 90000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627184/art_isujc8.jpg",
        location: "Convention Center",
        availableSeats: 400,
        organizerId: user9.id,
        isFree: false,
        slug: "art-exhibition",
      },
      {
        name: "Movie Night",
        excerpt: "A movie night",
        description: "Watch your favorite movies",
        date: new Date("2024-03-10T09:00:00Z"),
        price: 100000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627189/movie_night_cudbhg.jpg",
        location: "Convention Center",
        availableSeats: 500,
        organizerId: user1.id,
        isFree: false,
        slug: "movie-night",
      },
      {
        name: "Travel Adventure",
        excerpt: "A travel adventure",
        description: "Explore new destinations",
        date: new Date("2024-04-15T20:00:00Z"),
        price: 110000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627192/travel_adventure_q2dbl3.jpg",
        location: "Convention Center",
        availableSeats: 600,
        organizerId: user3.id,
        isFree: false,
        slug: "travel-adventure",
      },
      {
        name: "Health Workshop",
        excerpt: "A health workshop",
        description: "Learn about health and wellness",
        date: new Date("2024-05-20T15:00:00Z"),
        price: 120000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627189/health-workshop_zns6qb.jpg",
        location: "Convention Center",
        availableSeats: 700,
        organizerId: user5.id,
        isFree: false,
        slug: "health-workshop",
      },
      {
        name: "Education Conference",
        excerpt: "An education conference",
        description: "Learn from experts in education",
        date: new Date("2024-06-10T09:00:00Z"),
        price: 130000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627186/education-confrence_jujt4f.jpg",
        location: "Convention Center",
        availableSeats: 800,
        organizerId: user7.id,
        isFree: false,
        slug: "education-conference",
      },
      {
        name: "Community Gathering",
        excerpt: "A community gathering",
        description: "Join us for a community event",
        date: new Date("2024-07-15T20:00:00Z"),
        price: 140000,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739627185/community-gathering_ftzk89.jpg",
        location: "Convention Center",
        availableSeats: 900,
        organizerId: user9.id,
        isFree: false,
        slug: "community-gathering",
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
  const event4 = await prisma.event.findFirst({
    where: { name: "Food Festival" },
  });
  const event5 = await prisma.event.findFirst({
    where: { name: "Art Exhibition" },
  });
  const event6 = await prisma.event.findFirst({
    where: { name: "Movie Night" },
  });
  const event7 = await prisma.event.findFirst({
    where: { name: "Travel Adventure" },
  });
  const event8 = await prisma.event.findFirst({
    where: { name: "Health Workshop" },
  });
  const event9 = await prisma.event.findFirst({
    where: { name: "Education Conference" },
  });
  const event10 = await prisma.event.findFirst({
    where: { name: "Community Gathering" },
  });

  await prisma.categoryEvent.createMany({
    data: [
      { eventId: event1.id, categoryId: category1.id },
      { eventId: event2.id, categoryId: category2.id },
      { eventId: event3.id, categoryId: category3.id },
      { eventId: event4.id, categoryId: category4.id },
      { eventId: event5.id, categoryId: category5.id },
      { eventId: event6.id, categoryId: category6.id },
      { eventId: event7.id, categoryId: category7.id },
      { eventId: event8.id, categoryId: category8.id },
      { eventId: event9.id, categoryId: category9.id },
      { eventId: event10.id, categoryId: category10.id },
    ],
  });

  await prisma.referral.createMany({
    data: [
      { referredById: user1.id, referredUserId: user2.id },
      { referredById: user2.id, referredUserId: user3.id },
      { referredById: user3.id, referredUserId: user4.id },
      { referredById: user4.id, referredUserId: user5.id },
      { referredById: user5.id, referredUserId: user6.id },
      { referredById: user6.id, referredUserId: user7.id },
      { referredById: user7.id, referredUserId: user8.id },
      { referredById: user8.id, referredUserId: user9.id },
      { referredById: user9.id, referredUserId: user10.id },
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
      {
        userId: user4.id,
        pointsEarned: 125,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user5.id,
        pointsEarned: 150,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user6.id,
        pointsEarned: 175,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user7.id,
        pointsEarned: 200,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user8.id,
        pointsEarned: 225,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user9.id,
        pointsEarned: 250,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        userId: user10.id,
        pointsEarned: 275,
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
      {
        code: "COUPON4",
        discount: 40,
        userId: user4.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON5",
        discount: 50,
        userId: user5.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON6",
        discount: 60,
        userId: user6.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON7",
        discount: 70,
        userId: user7.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON8",
        discount: 80,
        userId: user8.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON9",
        discount: 90,
        userId: user9.id,
        expiresAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "COUPON10",
        discount: 100,
        userId: user10.id,
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
      {
        userId: user4.id,
        token: "TOKEN4",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user5.id,
        token: "TOKEN5",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user6.id,
        token: "TOKEN6",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user7.id,
        token: "TOKEN7",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user8.id,
        token: "TOKEN8",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user9.id,
        token: "TOKEN9",
        expiredDate: new Date("2023-12-31T23:59:59Z"),
        used: false,
      },
      {
        userId: user10.id,
        token: "TOKEN10",
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
      { userId: user4.id, eventId: event4.id },
      { userId: user5.id, eventId: event5.id },
      { userId: user6.id, eventId: event6.id },
      { userId: user7.id, eventId: event7.id },
      { userId: user8.id, eventId: event8.id },
      { userId: user9.id, eventId: event9.id },
      { userId: user10.id, eventId: event10.id },
    ],
  });
  const registration1 = await prisma.registration.findFirst({
    where: { userId: user1.id, eventId: event1.id },
  });
  const registration2 = await prisma.registration.findFirst({
    where: { userId: user2.id, eventId: event2.id },
  });
  const registration3 = await prisma.registration.findFirst({
    where: { userId: user3.id, eventId: event3.id },
  });
  const registration4 = await prisma.registration.findFirst({
    where: { userId: user4.id, eventId: event4.id },
  });
  const registration5 = await prisma.registration.findFirst({
    where: { userId: user5.id, eventId: event5.id },
  });
  const registration6 = await prisma.registration.findFirst({
    where: { userId: user6.id, eventId: event6.id },
  });
  const registration7 = await prisma.registration.findFirst({
    where: { userId: user7.id, eventId: event7.id },
  });
  const registration8 = await prisma.registration.findFirst({
    where: { userId: user8.id, eventId: event8.id },
  });
  const registration9 = await prisma.registration.findFirst({
    where: { userId: user9.id, eventId: event9.id },
  });
  const registration10 = await prisma.registration.findFirst({
    where: { userId: user10.id, eventId: event10.id },
  });

  await prisma.transaction.createMany({
    data: [
      {
        amount: 50000,
        userId: user1.id,
        eventId: event1.id,
        registrationId: registration1.id,
      },
      {
        amount: 60000,
        userId: user2.id,
        eventId: event2.id,
        registrationId: registration2.id,
      },
      {
        amount: 70000,
        userId: user3.id,
        eventId: event3.id,
        registrationId: registration3.id,
      },
      {
        amount: 80000,
        userId: user4.id,
        eventId: event4.id,
        registrationId: registration4.id,
      },
      {
        amount: 90000,
        userId: user5.id,
        eventId: event5.id,
        registrationId: registration5.id,
      },
      {
        amount: 100000,
        userId: user6.id,
        eventId: event6.id,
        registrationId: registration6.id,
      },
      {
        amount: 110000,
        userId: user7.id,
        eventId: event7.id,
        registrationId: registration7.id,
      },
      {
        amount: 120000,
        userId: user8.id,
        eventId: event8.id,
        registrationId: registration8.id,
      },
      {
        amount: 130000,
        userId: user9.id,
        eventId: event9.id,
        registrationId: registration9.id,
      },
      {
        amount: 140000,
        userId: user10.id,
        eventId: event10.id,
        registrationId: registration10.id,
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
      {
        receiptCode: "RC4",
        receiptTotal: 75.0,
        transactionId: transactions[3].id,
      },
      {
        receiptCode: "RC5",
        receiptTotal: 45.0,
        transactionId: transactions[4].id,
      },
      {
        receiptCode: "RC6",
        receiptTotal: 60.0,
        transactionId: transactions[5].id,
      },
      {
        receiptCode: "RC7",
        receiptTotal: 90.0,
        transactionId: transactions[6].id,
      },
      {
        receiptCode: "RC8",
        receiptTotal: 80.0,
        transactionId: transactions[7].id,
      },
      {
        receiptCode: "RC9",
        receiptTotal: 55.0,
        transactionId: transactions[8].id,
      },
      {
        receiptCode: "RC10",
        receiptTotal: 70.0,
        transactionId: transactions[9].id,
      },
    ],
  });

  await prisma.attendee.createMany({
    data: [
      {
        eventId: event1.id,
        name: "edwardn",
        email: "edward@example",
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
      {
        eventId: event4.id,
        overallExperience: 4,
        qualityOfEvent: 4,
        suggestions: "Good event.",
      },
      {
        eventId: event5.id,
        overallExperience: 5,
        qualityOfEvent: 5,
        suggestions: "Excellent!",
      },
      {
        eventId: event6.id,
        overallExperience: 4,
        qualityOfEvent: 4,
        suggestions: "Good event.",
      },
      {
        eventId: event7.id,
        overallExperience: 5,
        qualityOfEvent: 5,
        suggestions: "Excellent!",
      },
      {
        eventId: event8.id,
        overallExperience: 4,
        qualityOfEvent: 4,
        suggestions: "Good event.",
      },
      {
        eventId: event9.id,
        overallExperience: 5,
        qualityOfEvent: 5,
        suggestions: "Excellent!",
      },
      {
        eventId: event10.id,
        overallExperience: 4,
        qualityOfEvent: 4,
        suggestions: "Good event.",
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
      {
        code: "VOUCHER4",
        discountRate: 40,
        stock: 250,
        eventId: event4.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER5",
        discountRate: 50,
        stock: 300,
        eventId: event5.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER6",
        discountRate: 60,
        stock: 350,
        eventId: event6.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER7",
        discountRate: 70,
        stock: 400,
        eventId: event7.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER8",
        discountRate: 80,
        stock: 450,
        eventId: event8.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER9",
        discountRate: 90,
        stock: 500,
        eventId: event9.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        code: "VOUCHER10",
        discountRate: 100,
        stock: 550,
        eventId: event10.id,
        expiredAt: new Date("2024-01-01T00:00:00Z"),
      },
    ],
  });

  await prisma.wallet.createMany({
    data: [
      { userId: user1.id, balance: 100.0 },
      { userId: user2.id, balance: 200.0 },
      { userId: user3.id, balance: 150.0 },
      { userId: user4.id, balance: 300.0 },
      { userId: user5.id, balance: 250.0 },
      { userId: user6.id, balance: 400.0 },
      { userId: user7.id, balance: 350.0 },
      { userId: user8.id, balance: 500.0 },
      { userId: user9.id, balance: 450.0 },
      { userId: user10.id, balance: 600.0 },
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
