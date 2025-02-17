// import { Request, Response, NextFunction } from "express";
// import { PrismaClient, Role } from "@prisma/client";
// import { genSalt, hash } from "bcryptjs";
// import crypto from "node:crypto";
// import Handlebars from "handlebars";
// import fs from "node:fs/promises";
// import { Resend } from "resend";
// import { registerSchema } from "../schemas/auth-schemas";

// const prisma = new PrismaClient();
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function register(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { name, username, email, password, role, referralCode } =
//       registerSchema.parse(req.body);

//     if (!name || !username || !email || !password || !role) {
//       res.status(400).json({ message: "Missing required fields" });
//       return;
//     }

//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [{ email }, { username }],
//       },
//     });

//     if (existingUser) {
//       res
//         .status(400)
//         .json({ message: "Email or username has already been used" });
//       return;
//     }


//     const salt = await genSalt(10);
//     const hashedPassword = await hash(password, salt);

//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         username,
//         email,
//         password: hashedPassword,
//         role: role as Role,
//         referralNumber: "",
//       },
//     });

//     const referralNumber = `${newUser.id}REF${Date.now().toString().slice(-3)}`;
//     await prisma.user.update({
//       where: { id: newUser.id },
//       data: { referralNumber },
//     });

//     if (referralCode) {
//       const referringUser = await prisma.user.findUnique({
//         where: { referralNumber: referralCode },
//       });

//       if (referringUser) {
//         await prisma.point.upsert({
//           where: { userId: referringUser.id },
//           update: {
//             pointsEarned: { increment: 10000 }, // Adds points instead of replacing them
//             expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
//           },
//           create: {
//             userId: referringUser.id,
//             pointsEarned: 10000,
//             expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
//           },
//         });

// // const existingPoint = await prisma.point.findUnique({
// //   where: { userId: referringUser.id },
// // });

// // if (!existingPoint) {
// //   // Kalau belum ada, bikin baru
// //   await prisma.point.create({
// //     data: {
// //       userId: referringUser.id,
// //       pointsEarned: 10000,
// //       expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
// //     },
// //   });
// // } else {
// //   // Kalau sudah ada, mungkin update data existing?
// //   await prisma.point.update({
// //     where: { userId: referringUser.id },
// //     data: {
// //       pointsEarned: existingPoint.pointsEarned + 10000,
// //       expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
// //     },
// //   });
// // }


//         await prisma.referral.create({
//           data: {
//             referredById: referringUser.id,
//             referredUserId: newUser.id,
//           },
//         });

//         // await prisma.coupon.create({
//         //   data: {
//         //     userId: newUser.id,
//         //     expiresAt: new Date(Date.now() + 3 * 60 * 1000),
//         //     code: `COUPON${newUser.id}${Date.now().toString().slice(-3)}`,
//         //   },
//         // });

//         await prisma.coupon.create({
//           data: {
//             userId: newUser.id,
//             discount: 10,
//             expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3))},
//             // expiresAt: new Date(Date.now() + 3 * 60 * 1000),          },
//         });
//       } else {
//         res.status(400).json({ message: "Referral code is invalid." });
//         return;
//       }
//     }

//     const confirmToken = crypto.randomBytes(20).toString("hex");
//     const confirmationLink = `http://localhost:8000/api/v1/confirm/email?token=${confirmToken}`;

//     await prisma.confirmToken.create({
//       data: {
//         expiredDate: new Date(Date.now() + 1000 * 60 * 5),
//         token: confirmToken,
//         userId: newUser.id,
//       },
//     });

//     const templateSource = await fs.readFile(
//       "src/templates/email-confirmation-template.hbs"
//     );
//     const compiledTemplate = Handlebars.compile(templateSource.toString());
//     const htmlTemplate = compiledTemplate({
//       name: name,
//       confirmationLink: confirmationLink,
//     });
//     const { error } = await resend.emails.send({
//       from: "Happenings Hub <onboarding@resend.dev>",
//       to: email,
//       subject: "Confirmation Email",
//       html: htmlTemplate,
//     });

//     if (error) {
//       res.status(400).json({ error });
//       return;
//     }

//     res.status(200).json({ message: "Register completed!" });
//   } catch (error) {
//     next(error);
//   }
// }

import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import crypto from "node:crypto";
import Handlebars from "handlebars";
import fs from "node:fs/promises";
import { Resend } from "resend";
import { registerSchema } from "../schemas/auth-schemas";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, username, email, password, role, referralCode } =
      registerSchema.parse(req.body);

    if (!name || !username || !email || !password || !role) {
      res.status(400).json({ message: "Missing required fields" });
      return
    }

    // Cek apakah email / username sudah terpakai
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "Email or username has already been used" });
        return
    }

    // Hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Buat user baru (sementara referralNumber kosong)
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: role as Role,
        referralNumber: "",
      },
    });

    // Generate referralNumber unik
    const referralNumber = `${newUser.id}REF${Date.now().toString().slice(-3)}`;
    await prisma.user.update({
      where: { id: newUser.id },
      data: { referralNumber },
    });

    // === Jika user isi referral code ===
    if (referralCode) {
      const referringUser = await prisma.user.findUnique({
        where: { referralNumber: referralCode },
      });

      if (!referringUser) {
        res.status(400).json({ message: "Referral code is invalid." });
        return
      }

      // (1) Tambah points ke referringUser => upsert (tambah 10k + reset expired di 3 bulan ke depan)
      await prisma.point.upsert({
        where: { userId: referringUser.id }, // menggunakan userId sbg unique
        update: {
          pointsEarned: { increment: 10000 }, 
          expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        },
        create: {
          userId: referringUser.id,
          pointsEarned: 10000,
          expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        },
      });

      // (2) Masukkan ke tabel referral (log)
      await prisma.referral.create({
        data: {
          referredById: referringUser.id,
          referredUserId: newUser.id,
        },
      });

      // (3) Tambahkan diskon 10% ke user baru => upsert coupon
      const existingCoupon = await prisma.coupon.findFirst({
        where: {
          userId: newUser.id,
          expiresAt: { gte: new Date() }, // masih valid
        },
      });

      if (existingCoupon) {
        // Jika user sudah punya coupon yang masih berlaku, tambah diskon 10%
        let newDiscount = existingCoupon.discount + 10;
        if (newDiscount > 100) newDiscount = 100; // batas diskon 100% max
        await prisma.coupon.update({
          where: { id: existingCoupon.id },
          data: {
            discount: newDiscount,
            expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)), // reset expiry
          },
        });
      } else {
        // Kalau belum punya coupon valid, buat baru
        await prisma.coupon.create({
          data: {
            userId: newUser.id,
            discount: 10, // diskon 10%
            expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          },
        });
      }
    }

    // Generate confirm token untuk verifikasi email
    const confirmToken = crypto.randomBytes(20).toString("hex");
    const confirmationLink = `http://localhost:8000/api/v1/confirm/email?token=${confirmToken}`;

    await prisma.confirmToken.create({
      data: {
        expiredDate: new Date(Date.now() + 1000 * 60 * 5),
        token: confirmToken,
        userId: newUser.id,
      },
    });

    // Kirim email konfirmasi (pakai template Handlebars)
    const templateSource = await fs.readFile(
      "src/templates/email-confirmation-template.hbs"
    );
    const compiledTemplate = Handlebars.compile(templateSource.toString());
    const htmlTemplate = compiledTemplate({
      name,
      confirmationLink,
    });
    const { error } = await resend.emails.send({
      from: "Happenings Hub <onboarding@resend.dev>",
      to: email,
      subject: "Confirmation Email",
      html: htmlTemplate,
    });

    if (error) {
      res.status(400).json({ error });
      return
    }

    res.status(200).json({ message: "Register completed!" });
  } catch (error) {
    next(error);
  }
}
