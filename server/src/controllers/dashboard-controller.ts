// src/controllers/dashboard-controller.ts

import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/v1/dashboard
export async function getOrganizerDashboard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // // 1) Check if user is an organizer
    const userId = req.user?.id
    const userRole = req.user?.role
    if (!userId || userRole !== 'ORGANIZERS') {
      res.status(403).json({ message: 'Access denied. Organizers only.' })
      return
    }

    // 2) Fetch all events owned by this organizer
    const events = await prisma.event.findMany({
      where: { organizerId: userId },
      include: {
        registrations: true,
        transactions: true,
      },
    })

    // Example: Count total registrations & sum transactions
    let totalRegistrations = 0
    let totalRevenue = 0

    events.forEach((event) => {
      totalRegistrations += event.registrations.length
      // Summation of transaction amounts
      const eventRevenue = event.transactions.reduce((sum, tx) => {
        return sum + Number(tx.amount)
      }, 0)
      totalRevenue += eventRevenue
    })

    // 3) Basic "statistics" for your chart
    //    We'll do a daily, monthly, yearly grouping of registrations

    // For example, let's get all registrations for this organizer’s events:
    const allRegs = await prisma.registration.findMany({
      where: {
        event: {
          organizerId: userId,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    })

    // We can do more advanced grouping with Prisma's groupBy or do it manually
    // For demonstration, let's do a manual grouping by day, month, year

    // Create some helper function to format date
    function getYearMonthDay(date: Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // 0-based
        day: date.getDate(),
      }
    }

    // Group by day
    const dailyStats: Record<string, number> = {}
    allRegs.forEach((reg) => {
      const { year, month, day } = getYearMonthDay(reg.createdAt)
      const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      dailyStats[key] = (dailyStats[key] || 0) + 1
    })

    // If you want monthly stats, you can do something similar:
    const monthlyStats: Record<string, number> = {}
    allRegs.forEach((reg) => {
      const { year, month } = getYearMonthDay(reg.createdAt)
      const key = `${year}-${String(month).padStart(2, '0')}`
      monthlyStats[key] = (monthlyStats[key] || 0) + 1
    })

    // And yearly stats:
    const yearlyStats: Record<string, number> = {}
    allRegs.forEach((reg) => {
      const { year } = getYearMonthDay(reg.createdAt)
      yearlyStats[year] = (yearlyStats[year] || 0) + 1
    })

    // 4) Return everything in a single response
    res.status(200).json({
      events,             // array of the events with registrations & transactions
      totalEvents: events.length,
      totalRegistrations,
      totalRevenue,
      stats: {
        daily: dailyStats,
        monthly: monthlyStats,
        yearly: yearlyStats,
      },
    })
  } catch (error) {
    next(error)
  }
}
