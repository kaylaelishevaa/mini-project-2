import { PrismaClient, Role } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // await prisma.category.deleteMany();
  // await prisma.categoryEvent.deleteMany();
  // await prisma.event.deleteMany();
  // await prisma.confirmToken.deleteMany();
  // await prisma.user.deleteMany();

  const salt = await genSalt(10);
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Music Concert",
        description: "Live music performances by various artists.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/music_b0xzik.jpg",
        slug: "music-concert",
      },
      {
        name: "Sports Event",
        description: "Live sports competitions and games.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/sport_mt3ikp.jpg",
        slug: "sports-event",
      },
      {
        name: "Tech Conference",
        description:
          "Conferences and workshops on the latest technology trends.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159349/tech_cis7a0.jpg",
        slug: "tech-conference",
      },
      {
        name: "Art Exhibition",
        description: "Exhibition of various art pieces.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/art_dutrcp.jpg",
        slug: "art-exhibition",
      },
      {
        name: "Business Seminar",
        description: "Seminars on business strategies and career development.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/business_yqdiwx.jpg",
        slug: "business-seminar",
      },
      {
        name: "Food Festival",
        description: "Festival featuring various delicious cuisines.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/food_axosei.jpg",
        slug: "food-festival",
      },
      {
        name: "Automobile Show",
        description: "Showcase of the latest automobile models.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/automobile_lcd5v2.jpg",
        slug: "automobile-show",
      },
      {
        name: "Film Concert",
        description: "Film concerts with large screen projections.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159348/film_kae9b2.jpg",
        slug: "film-concert",
      },
      {
        name: "Fashion Show",
        description: "Fashion shows featuring the latest designs.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159347/fashion_gr3vqt.jpg",
        slug: "fashion-show",
      },
      {
        name: "Theater Concert",
        description: "Theater concerts with drama and musical performances.",
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739159349/theatre_jiy5zc.jpg",
        slug: "theater-concert",
      },
    ],
  });

  // Retrieve created categories
  const createdCategories = await prisma.category.findMany();


  // // Manual dummy data for CUSTOMERS
  // const customers = [
  //   {
  //     name: "Customer 1",
  //     username: "customer1",
  //     email: "customer1@example.com",
  //     password: await hash("hashedpassword1", salt),
  //     referralNumber: "CUST1REF1001",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 2",
  //     username: "customer2",
  //     email: "customer2@example.com",
  //     password: await hash("hashedpassword2", salt),
  //     referralNumber: "CUST2REF1002",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 3",
  //     username: "customer3",
  //     email: "customer3@example.com",
  //     password: await hash("hashedpassword3", salt),
  //     referralNumber: "CUST3REF1003",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 4",
  //     username: "customer4",
  //     email: "customer4@example.com",
  //     password: await hash("hashedpassword4", salt),
  //     referralNumber: "CUST4REF1004",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 5",
  //     username: "customer5",
  //     email: "customer5@example.com",
  //     password: await hash("hashedpassword5", salt),
  //     referralNumber: "CUST5REF1005",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 6",
  //     username: "customer6",
  //     email: "customer6@example.com",
  //     password: await hash("hashedpassword6", salt),
  //     referralNumber: "CUST6REF1006",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 7",
  //     username: "customer7",
  //     email: "customer7@example.com",
  //     password: await hash("hashedpassword7", salt),
  //     referralNumber: "CUST7REF1007",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 8",
  //     username: "customer8",
  //     email: "customer8@example.com",
  //     password: await hash("hashedpassword8", salt),
  //     referralNumber: "CUST8REF1008",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 9",
  //     username: "customer9",
  //     email: "customer9@example.com",
  //     password: await hash("hashedpassword9", salt),
  //     referralNumber: "CUST9REF1009",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Customer 10",
  //     username: "customer10",
  //     email: "customer10@example.com",
  //     password: await hash("hashedpassword10", salt),
  //     referralNumber: "CUST10REF1010",
  //     role: Role.CUSTOMERS,
  //     emailConfirmed: true,
  //   },
  // ];

  // // Manual dummy data for ORGANIZERS
  // const organizers = [
  //   {
  //     name: "Organizer 1",
  //     username: "organizer1",
  //     email: "organizer1@example.com",
  //     password: await hash("hashedpassword11", salt),
  //     referralNumber: "ORG1REF2001",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 2",
  //     username: "organizer2",
  //     email: "organizer2@example.com",
  //     password: await hash("hashedpassword12", salt),
  //     referralNumber: "ORG2REF2002",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 3",
  //     username: "organizer3",
  //     email: "organizer3@example.com",
  //     password: await hash("hashedpassword13", salt),
  //     referralNumber: "ORG3REF2003",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 4",
  //     username: "organizer4",
  //     email: "organizer4@example.com",
  //     password: await hash("hashedpassword14", salt),
  //     referralNumber: "ORG4REF2004",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 5",
  //     username: "organizer5",
  //     email: "organizer5@example.com",
  //     password: await hash("hashedpassword15", salt),
  //     referralNumber: "ORG5REF2005",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 6",
  //     username: "organizer6",
  //     email: "organizer6@example.com",
  //     password: await hash("hashedpassword16", salt),
  //     referralNumber: "ORG6REF2006",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 7",
  //     username: "organizer7",
  //     email: "organizer7@example.com",
  //     password: await hash("hashedpassword17", salt),
  //     referralNumber: "ORG7REF2007",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 8",
  //     username: "organizer8",
  //     email: "organizer8@example.com",
  //     password: await hash("hashedpassword18", salt),
  //     referralNumber: "ORG8REF2008",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 9",
  //     username: "organizer9",
  //     email: "organizer9@example.com",
  //     password: await hash("hashedpassword19", salt),
  //     referralNumber: "ORG9REF2009",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  //   {
  //     name: "Organizer 10",
  //     username: "organizer10",
  //     email: "organizer10@example.com",
  //     password: await hash("hashedpassword20", salt),
  //     referralNumber: "ORG10REF2010",
  //     role: Role.ORGANIZERS,
  //     emailConfirmed: true,
  //   },
  // ];

  // // Insert all customers
  // for (const customer of customers) {
  //   await prisma.user.create({ data: customer });
  // }

  // // Insert all organizers
  // for (const organizer of organizers) {
  //   await prisma.user.create({ data: organizer });
  // }

  // Create Events
  const events = await prisma.event.createMany({
    data: [
      {
        name: "Rock Night Live",
        excerpt: "Experience the best of rock music with top artists.",
        description:
          "Join us for an unforgettable night of rock music with performances by your favorite artists.",
        location: "City Auditorium",
        date: new Date("2025-12-15T20:00:00Z"),
        price: 50000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/rock_ih2gbg.jpg",
        availableSeats: 1000,
        isFree: false,
        slug: "rock-night-live",
        organizerId: 85,
      },
      {
        name: "Basketball Championship",
        excerpt:
          "Watch the best basketball players compete for the championship.",
        description:
          "Experience the thrill of a basketball championship with top players from around the world.",
        location: "National Stadium",
        date: new Date("2025-11-20T18:00:00Z"),
        price: 75000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/basketball_eeylrl.jpg",
        availableSeats: 5000,
        isFree: false,
        slug: "basketball-championship",
        organizerId: 86,
      },
      {
        name: "Tech Innovators Conference",
        excerpt: "Learn about the latest innovations in technology.",
        description:
          "Join leading experts and innovators to discuss the future of technology.",
        location: "Convention Center",
        date: new Date("2025-10-10T09:00:00Z"),
        price: 0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/tech_renhfh.jpg",
        availableSeats: 2000,
        isFree: true,
        slug: "tech-innovators-conference",
        organizerId: 87,
      },
      {
        name: "Art Exhibition Modern",
        excerpt: "Exhibition of modern art pieces.",
        description: "View modern art pieces from renowned artists.",
        location: "Art Gallery",
        date: new Date("2025-09-25T10:00:00Z"),
        price: 30000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/art_ojnhwk.jpg",
        availableSeats: 500,
        isFree: false,
        slug: "art-exhibition-modern",
        organizerId: 88,
      },
      {
        name: "Business Management Seminar",
        excerpt: "Seminars on business management and career development.",
        description:
          "Learn business management strategies and career development.",
        location: "Five-Star Hotel",
        date: new Date("2025-08-15T09:00:00Z"),
        price: 150000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/business_rsbj1d.jpg",
        availableSeats: 300,
        isFree: false,
        slug: "business-management-seminar",
        organizerId: 89,
      },
      {
        name: "Food Festival",
        excerpt: "Festival featuring various delicious cuisines.",
        description: "Enjoy various delicious cuisines from around the world.",
        location: "City Park",
        date: new Date("2025-07-20T12:00:00Z"),
        price: 25000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/food_qklsjx.jpg",
        availableSeats: 1000,
        isFree: false,
        slug: "food-festival",
        organizerId: 90,
      },
      {
        name: "Automobile Show",
        excerpt: "Showcase of the latest automobile models.",
        description: "View the latest automobile models from various brands.",
        location: "Sports Stadium",
        date: new Date("2025-06-10T09:00:00Z"),
        price: 100000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/automobile_enursa.jpg",
        availableSeats: 2000,
        isFree: false,
        slug: "automobile-show",
        organizerId: 91,
      },
      {
        name: "Film Concert",
        excerpt: "Film concerts with large screen projections.",
        description: "Enjoy film concerts with large screen projections.",
        location: "Film Auditorium",
        date: new Date("2025-05-25T18:00:00Z"),
        price: 40000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158874/film_event_lfmqg1.jpg",
        availableSeats: 800,
        isFree: false,
        slug: "film-concert",
        organizerId: 92,
      },
      {
        name: "Fashion Show Latest",
        excerpt: "Fashion shows featuring the latest designs.",
        description: "View the latest fashion designs from top designers.",
        location: "Fashion Gallery",
        date: new Date("2025-04-15T10:00:00Z"),
        price: 50000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158875/fashion_show_vb4ony.jpg",
        availableSeats: 600,
        isFree: false,
        slug: "fashion-show",
        organizerId: 93,
      },
      {
        name: "Theater Concert",
        excerpt: "Theater concerts with drama and musical performances.",
        description: "Enjoy drama and musical performances by top artists.",
        location: "City Theater",
        date: new Date("2025-03-20T19:00:00Z"),
        price: 60000.0,
        image:
          "https://res.cloudinary.com/dm1cnsldc/image/upload/v1739158876/theatre_vktr9r.jpg",
        availableSeats: 700,
        isFree: false,
        slug: "theater-concert",
        organizerId: 94,
      },
    ],
  });

  // Retrieve created events
  const createdEvents = await prisma.event.findMany();

  // Establish CategoryEvent relationships
  for (let i = 0; i < createdEvents.length; i++) {
    await prisma.categoryEvent.create({
      data: {
        eventId: createdEvents[i].id,
        categoryId: createdCategories[i % createdCategories.length].id,
      },
    });
  }


  console.info("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
