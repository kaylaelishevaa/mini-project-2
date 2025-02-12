import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create CUSTOMER-------------------------------------------------------------------------
  const customer1 = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: "hashed_password_1",
      email: "john.doe@example.com",
      role: "CUSTOMERS",
      referralNumber: "REF12345",
      walletBalance: 500,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      username: "janesmith",
      password: "hashed_password_2",
      email: "jane.smith@example.com",
      role: "CUSTOMERS",
      referralNumber: "REF67890",
      walletBalance: 1000,
    },
  });
  // Create Categories
  await prisma.category.create({
    data: {
      name: "Music Concert",
      description: "Live music performances by various artists.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/music_b0xzik.jpg",
      slug: "music-concert",
    },
  });

  await prisma.category.create({
    data: {
      name: "Sports Event",
      description: "Live sports competitions and games.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/sport_mt3ikp.jpg",
      slug: "sports-event",
    },
  });

  await prisma.category.create({
    data: {
      name: "Tech Conference",
      description: "Conferences and workshops on the latest technology trends.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159349/tech_cis7a0.jpg",
      slug: "tech-conference",
    },
  });

  await prisma.category.create({
    data: {
      name: "Art Exhibition",
      description: "Exhibition of various art pieces.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/art_dutrcp.jpg",
      slug: "art-exhibition",
    },
  });

  await prisma.category.create({
    data: {
      name: "Business Seminar",
      description: "Seminars on business strategies and career development.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/business_yqdiwx.jpg",
      slug: "business-seminar",
    },
  });

  await prisma.category.create({
    data: {
      name: "Food Festival",
      description: "Festival featuring various delicious cuisines.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/food_axosei.jpg",
      slug: "food-festival",
    },
  });

  await prisma.category.create({
    data: {
      name: "Automobile Show",
      description: "Showcase of the latest automobile models.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
      slug: "automobile-show",
    },
  });

  await prisma.category.create({
    data: {
      name: "Film Concert",
      description: "Film concerts with large screen projections.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/film_kae9b2.jpg",
      slug: "film-concert",
    },
  });

  await prisma.category.create({
    data: {
      name: "Fashion Show",
      description: "Fashion shows featuring the latest designs.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/fashion_gr3vqt.jpg",
      slug: "fashion-show",
    },
  });

  await prisma.category.create({
    data: {
      name: "Theater Concert",
      description: "Theater concerts with drama and musical performances.",
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159349/theatre_jiy5zc.jpg",
      slug: "theater-concert",
    },
  });

  // Create ORGANIZER-------------------------------------------------------------------------
  const organizer1 = await prisma.user.create({
    data: {
      name: "Event Organizer 1",
      username: "eventorg1",
      password: "hashed_password_1",
      email: "event.organizer1@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF11111",
      walletBalance: 0,
    },
  });

  const organizer2 = await prisma.user.create({
    data: {
      name: "Event Organizer 2",
      username: "eventorg2",
      password: "hashed_password_2",
      email: "event.organizer2@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF22222",
      walletBalance: 100,
    },
  });

  const organizer3 = await prisma.user.create({
    data: {
      name: "Event Organizer 3",
      username: "eventorg3",
      password: "hashed_password_3",
      email: "event.organizer3@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF33333",
      walletBalance: 200,
    },
  });

  const organizer4 = await prisma.user.create({
    data: {
      name: "Event Organizer 4",
      username: "eventorg4",
      password: "hashed_password_4",
      email: "event.organizer4@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF44444",
      walletBalance: 300,
    },
  });

  const organizer5 = await prisma.user.create({
    data: {
      name: "Event Organizer 5",
      username: "eventorg5",
      password: "hashed_password_5",
      email: "event.organizer5@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF55555",
      walletBalance: 400,
    },
  });

  const organizer6 = await prisma.user.create({
    data: {
      name: "Event Organizer 6",
      username: "eventorg6",
      password: "hashed_password_6",
      email: "event.organizer6@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF66666",
      walletBalance: 500,
    },
  });

  const organizer7 = await prisma.user.create({
    data: {
      name: "Event Organizer 7",
      username: "eventorg7",
      password: "hashed_password_7",
      email: "event.organizer7@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF77777",
      walletBalance: 600,
    },
  });

  const organizer8 = await prisma.user.create({
    data: {
      name: "Event Organizer 8",
      username: "eventorg8",
      password: "hashed_password_8",
      email: "event.organizer8@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF88888",
      walletBalance: 700,
    },
  });

  const organizer9 = await prisma.user.create({
    data: {
      name: "Event Organizer 9",
      username: "eventorg9",
      password: "hashed_password_9",
      email: "event.organizer9@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF99999",
      walletBalance: 800,
    },
  });

  const organizer10 = await prisma.user.create({
    data: {
      name: "Event Organizer 10",
      username: "eventorg10",
      password: "hashed_password_10",
      email: "event.organizer10@example.com",
      role: "ORGANIZERS",
      referralNumber: "REF101010",
      walletBalance: 900,
    },
  });

  // Create Referrals---------------------------------------------------------------------------------------------------
  await prisma.referral.create({
    data: {
      referredById: organizer1.id,
      referredUserId: customer1.id,
    },
  });

  await prisma.referral.create({
    data: {
      referredById: organizer1.id,
      referredUserId: customer2.id,
    },
  });

  // Create Points--------------------------------------------------------------------------------------------------------
  await prisma.point.create({
    data: {
      userId: customer1.id,
      pointsEarned: 15000,
      expiresAt: new Date("2023-12-31T23:59:59Z"),
    },
  });

  await prisma.point.create({
    data: {
      userId: customer2.id,
      pointsEarned: 20000,
      expiresAt: new Date("2025-12-31T23:59:59Z"),
    },
  });

  // Create Coupons------------------------------------------------------------------------------------------------------------
  await prisma.coupon.create({
    data: {
      userId: customer1.id,
      discount: 20,
      expiresAt: new Date("2025-12-31T23:59:59Z"),
    },
  });

  await prisma.coupon.create({
    data: {
      userId: customer2.id,
      discount: 25,
      expiresAt: new Date("2025-12-31T23:59:59Z"),
    },
  });

  // Create Events------------------------------------------------------------------------------------------------------------------

  // Create events with references to the promotions
  const event1 = await prisma.event.create({
    data: {
      name: "Rock Night Live",
      excerpt: "Experience the best of rock music!",
      description:
        "A night filled with the best rock bands from around the world.",
      date: new Date("2023-11-01T20:00:00Z"),
      price: 50000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/rock_ih2gbg.jpg",
      location: "City Auditorium",
      availableSeats: 200,
      organizerId: organizer1.id,
      isFree: false,
      slug: "rock-night-live",
      CategoryEvent: {
        create: [
          {
            categoryId: 1,
          },
        ],
      },
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: "Basketball Championship",
      excerpt: "Watch the best players compete!",
      description: "A championship featuring top basketball players.",
      date: new Date("2023-11-10T14:00:00Z"),
      price: 75000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/basketball_eeylrl.jpg",
      location: "Sports Arena",
      availableSeats: 150,
      organizerId: organizer2.id,
      isFree: false,
      slug: "basketball-championship",
      CategoryEvent: {
        create: [
          {
            categoryId: 2,
          },
        ],
      },
    },
  });

  const event3 = await prisma.event.create({
    data: {
      name: "Tech Innovators Conference",
      excerpt: "Discover the future of technology!",
      description: "A conference on the latest technological innovations.",
      date: new Date("2023-11-15T09:00:00Z"),
      price: 250000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/tech_renhfh.jpg",
      location: "Convention Center",
      availableSeats: 100,
      organizerId: organizer3.id,
      isFree: false,
      slug: "tech-innovators-conference",
      CategoryEvent: {
        create: [
          {
            categoryId: 3,
          },
        ],
      },
    },
  });

  const event4 = await prisma.event.create({
    data: {
      name: "Art Exhibition Modern",
      excerpt: "Explore modern art pieces!",
      description:
        "An exhibition featuring modern art pieces from various artists.",
      date: new Date("2023-11-20T10:00:00Z"),
      price: 30000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/art_ojnhwk.jpg",
      location: "Art Gallery",
      availableSeats: 120,
      organizerId: organizer4.id,
      isFree: false,
      slug: "art-exhibition-modern",
      CategoryEvent: {
        create: [
          {
            categoryId: 4,
          },
        ],
      },
    },
  });

  const event5 = await prisma.event.create({
    data: {
      name: "Business Management Seminar",
      excerpt: "Learn about business management!",
      description:
        "A seminar on business management strategies and techniques.",
      date: new Date("2023-11-25T09:00:00Z"),
      price: 150000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/business_rsbj1d.jpg",
      location: "Business Center",
      availableSeats: 80,
      organizerId: organizer5.id,
      isFree: false,
      slug: "business-management-seminar",
      CategoryEvent: {
        create: [
          {
            categoryId: 5,
          },
        ],
      },
    },
  });

  const event6 = await prisma.event.create({
    data: {
      name: "Food Festival",
      excerpt: "Taste the best of local cuisine!",
      description: "A festival featuring local and international cuisines.",
      date: new Date("2023-12-01T12:00:00Z"),
      price: 40000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/food_qklsjx.jpg",
      location: "City Park",
      availableSeats: 250,
      organizerId: organizer6.id,
      isFree: false,
      slug: "food-festival",
      CategoryEvent: {
        create: [
          {
            categoryId: 6,
          },
        ],
      },
    },
  });

  const event7 = await prisma.event.create({
    data: {
      name: "Automobile Show",
      excerpt: "See the latest in automotive technology!",
      description:
        "A show featuring the latest in automotive technology and design.",
      date: new Date("2023-12-05T10:00:00Z"),
      price: 100000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/automobile_enursa.jpg",
      location: "Exhibition Hall",
      availableSeats: 180,
      organizerId: organizer7.id,
      isFree: false,
      slug: "automobile-show",
      CategoryEvent: {
        create: [
          {
            categoryId: 7,
          },
        ],
      },
    },
  });

  const event8 = await prisma.event.create({
    data: {
      name: "Film Concert Cartoon",
      excerpt: "Enjoy a night of film and music!",
      description:
        "A concert featuring film screenings and live music performances.",
      date: new Date("2023-12-10T19:00:00Z"),
      price: 60000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/film_event_lfmqg1.jpg",
      location: "Cinema Hall",
      availableSeats: 150,
      organizerId: organizer8.id,
      isFree: false,
      slug: "film-concert",
      CategoryEvent: {
        create: [
          {
            categoryId: 8,
          },
        ],
      },
    },
  });

  const event9 = await prisma.event.create({
    data: {
      name: "Fashion Show Latest",
      excerpt: "Discover the latest fashion trends!",
      description: "A show featuring the latest fashion trends and designs.",
      date: new Date("2023-12-15T20:00:00Z"),
      price: 80000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/fashion_show_vb4ony.jpg",
      location: "Fashion Center",
      availableSeats: 120,
      organizerId: organizer9.id,
      isFree: false,
      slug: "fashion-show-latest",
      CategoryEvent: {
        create: [
          {
            categoryId: 9,
          },
        ],
      },
    },
  });

  const event10 = await prisma.event.create({
    data: {
      name: "Theater Concert",
      excerpt: "Experience live theater performances!",
      description:
        "A concert featuring live theater performances and musicals.",
      date: new Date("2023-12-20T19:00:00Z"),
      price: 70000,
      image:
        "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158876/theatre_vktr9r.jpg",
      location: "Theater Hall",
      availableSeats: 100,
      organizerId: organizer10.id,
      isFree: false,
      slug: "theater-concert",
      CategoryEvent: {
        create: [
          {
            categoryId: 10,
          },
        ],
      },
    },
  });

  const promotion1 = {
    create: [
      {
        name: "VIP Package",
        discountValue: 20,
        limit: 30,
        referralCode: "VIPROCK",
        validUntil: new Date("2023-10-25T23:59:59Z"),
      },
    ],
  };

  const promotion2 = {
    create: [
      {
        name: "Family Day Discount",
        discountValue: 10,
        limit: 50,
        referralCode: "FAMILYDAY",
        validUntil: new Date("2023-11-05T23:59:59Z"),
      },
    ],
  };

  const promotion3 = {
    create: [
      {
        name: "Early Bird Discount",
        discountValue: 20,
        limit: 50,
        referralCode: "EARLYBIRD",
        validUntil: new Date("2023-11-01T23:59:59Z"),
      },
    ],
  };

  const promotion4 = {
    create: [
      {
        name: "Student Discount",
        discountValue: 15,
        limit: 40,
        referralCode: "STUDENT",
        validUntil: new Date("2023-11-15T23:59:59Z"),
      },
    ],
  };

  const promotion5 = {
    create: [
      {
        name: "Group Discount",
        discountValue: 10,
        limit: 20,
        referralCode: "GROUP",
        validUntil: new Date("2023-11-20T23:59:59Z"),
      },
    ],
  };

  const promotion6 = {
    create: [
      {
        name: "Foodie Discount",
        discountValue: 10,
        limit: 60,
        referralCode: "FOODIE",
        validUntil: new Date("2023-11-25T23:59:59Z"),
      },
    ],
  };

  const promotion7 = {
    create: [
      {
        name: "Special Offer",
        discountValue: 15,
        limit: 45,
        referralCode: "SPECIAL",
        validUntil: new Date("2023-12-01T23:59:59Z"),
      },
    ],
  };

  const promotion8 = {
    create: [
      {
        name: "Film Buff Discount",
        discountValue: 10,
        limit: 50,
        referralCode: "FILMBUFF",
        validUntil: new Date("2023-12-05T23:59:59Z"),
      },
    ],
  };

  const promotion9 = {
    create: [
      {
        name: "Fashionista Discount",
        discountValue: 15,
        limit: 30,
        referralCode: "FASHIONISTA",
        validUntil: new Date("2023-12-10T23:59:59Z"),
      },
    ],
  };

  const promotion10 = {
    create: [
      {
        name: "Theater Lover Discount",
        discountValue: 10,
        limit: 40,
        referralCode: "THEATERLOVER",
        validUntil: new Date("2023-12-15T23:59:59Z"),
      },
    ],
  };

  // Create Registrations
  const registration1 = await prisma.registration.create({
    data: {
      eventId: event1.id,
      userId: customer1.id,
    },
  });

  const registration2 = await prisma.registration.create({
    data: {
      eventId: event2.id,
      userId: customer2.id,
    },
  });

  // Create Transactions
  await prisma.transaction.create({
    data: {
      amount: 200,
      eventId: event1.id,
      registrationId: registration1.id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 50,
      eventId: event2.id,
      registrationId: registration2.id,
    },
  });

  //   --------------------------------------------------------------------------------------------------------------
  // Create Attendees
  const attendees = [
    {
      eventId: event1.id,
      name: "John Doe",
      email: "john.doe@example.com",
      hasPaid: true,
      referralCode: "VIPROCK",
    },
    {
      eventId: event2.id,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      hasPaid: true,
      referralCode: "FAMILYDAY",
    },
    {
      eventId: event3.id,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      hasPaid: true,
      referralCode: "EARLYBIRD",
    },
    {
      eventId: event4.id,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      hasPaid: true,
      referralCode: "STUDENT",
    },
    {
      eventId: event5.id,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      hasPaid: true,
      referralCode: "GROUP",
    },
    {
      eventId: event6.id,
      name: "Diana Evans",
      email: "diana.evans@example.com",
      hasPaid: true,
      referralCode: "FOODIE",
    },
    {
      eventId: event7.id,
      name: "Ethan Foster",
      email: "ethan.foster@example.com",
      hasPaid: true,
      referralCode: "SPECIAL",
    },
    {
      eventId: event8.id,
      name: "Fiona Gates",
      email: "fiona.gates@example.com",
      hasPaid: true,
      referralCode: "FILMBUFF",
    },
    {
      eventId: event9.id,
      name: "George Hill",
      email: "george.hill@example.com",
      hasPaid: true,
      referralCode: "FASHIONISTA",
    },
    {
      eventId: event10.id,
      name: "Hannah Ivan",
      email: "hannah.ivan@example.com",
      hasPaid: true,
      referralCode: "THEATERLOVER",
    },
  ];

  for (const attendee of attendees) {
    await prisma.attendee.create({
      data: attendee,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
