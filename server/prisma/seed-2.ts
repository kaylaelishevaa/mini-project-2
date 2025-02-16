import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");

  await prisma.receipt.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.eventReview.deleteMany();
  await prisma.attendee.deleteMany();
  await prisma.voucher.deleteMany();
  await prisma.categoryEvent.deleteMany();
  await prisma.category.deleteMany();
  await prisma.event.deleteMany();
  await prisma.confirmToken.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.point.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding data...");

  // Hash passwords
  const hashedPassword1 = await bcrypt.hash("password123", 10);
  const hashedPassword2 = await bcrypt.hash("password456", 10);

  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: hashedPassword1,
      email: "johndoe@example.com",
      emailConfirmed: true,
      role: "CUSTOMERS",
      referralNumber: "REF12345",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      username: "janesmith",
      password: hashedPassword2,
      email: "janesmith@example.com",
      emailConfirmed: false,
      role: "ORGANIZERS",
      referralNumber: "REF67890",
    },
  });

  // Seed Referral
  await prisma.referral.create({
    data: {
      referredById: user1.id,
      referredUserId: user2.id,
    },
  });

  // Seed Points
  await prisma.point.create({
    data: {
      userId: user1.id,
      pointsEarned: 100,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  // Seed Coupons
  await prisma.coupon.create({
    data: {
      code: "DISCOUNT10",
      discount: 10,
      used: false,
      userId: user1.id,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  // Seed Wallet
  await prisma.wallet.create({
    data: {
      userId: user1.id,
      balance: 500.0,
    },
  });

  // Seed Event
  const event1 = await prisma.event.create({
    data: {
      name: "Tech Conference 2025",
      excerpt: "A conference for tech enthusiasts.",
      description: "Join the biggest tech conference of the year.",
      date: new Date(),
      price: 199.99,
      image: "event1.jpg",
      location: "New York",
      availableSeats: 100,
      organizerId: user2.id,
      isFree: false,
      slug: "tech-conference-2025",
    },
  });

  // Seed Category
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
      description: "Events related to technology.",
      image: "tech.jpg",
      slug: "technology",
    },
  });

  // Seed CategoryEvent
  await prisma.categoryEvent.create({
    data: {
      eventId: event1.id,
      categoryId: category1.id,
    },
  });

  // Seed Voucher
  await prisma.voucher.create({
    data: {
      code: "TECH25",
      discountRate: 25,
      stock: 50,
      eventId: event1.id,
      expiredAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  // Seed Registration
  const registration1 = await prisma.registration.create({
    data: {
      eventId: event1.id,
      userId: user1.id,
    },
  });

  // Seed Transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      amount: 199.99,
      userId: user1.id,
      eventId: event1.id,
      registrationId: registration1.id,
    },
  });

  // Seed Receipt
  await prisma.receipt.create({
    data: {
      receiptCode: "RCPT12345",
      receiptTotal: 199.99,
      transactionId: transaction1.id,
    },
  });

  // Seed Attendee
  await prisma.attendee.create({
    data: {
      eventId: event1.id,
      name: "John Doe",
      email: "johndoe@example.com",
      hasPaid: true,
    },
  });

  // Seed Event Review
  await prisma.eventReview.create({
    data: {
      eventId: event1.id,
      overallExperience: 5,
      qualityOfEvent: 4,
      suggestions: "Great event!",
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
