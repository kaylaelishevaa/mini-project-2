import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function dateToCron(dateInput: Date) {
  const minutes = dateInput.getMinutes();
  const hours = dateInput.getHours();
  const dayOfMonth = dateInput.getDate();
  const month = dateInput.getMonth() + 1;
  const day = "*";

  const cronString = `${minutes} ${hours} ${dayOfMonth} ${month} ${day}`;
  return cronString;
}

// export function publishEvent(eventId: number, publishedDate: Date) {
//   const cronTime = dateToCron(publishedDate);
//   const eventJob = cron.schedule(cronTime, async () => {
//     try {
//       await prisma.event.update({
//         where: { id: eventId },
//         data: { published: true },
//       });

//       console.log(`event with id ${eventId} has been published!`);

//       eventJob.stop();
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }
