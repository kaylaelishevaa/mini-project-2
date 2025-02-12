import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getOrganizerDashboard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("=> getOrganizerDashboard called");
  console.log("req.user = ", req.user);
  try {
    const userId = req.user?.id

    // if (!userId) {
    //   res.status(400).json({ message: "Unauthorized!""})
    //   return
    // }

    // 1) Fetch all events owned by this organizer
    const events = await prisma.event.findMany({
      where: { organizerId: userId },
      include: {
        registrations: true,
        transactions: true,
      },
    })
    console.log(userId)

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

    // 2) Basic statistics for the chart
    // Get all registrations for this organizer’s events:
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


    // Create some helper function to format date
    function getYearMonthDay(date: Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // since it is 0-based
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

    // Group by months
    const monthlyStats: Record<string, number> = {}
    allRegs.forEach((reg) => {
      const { year, month } = getYearMonthDay(reg.createdAt)
      const key = `${year}-${String(month).padStart(2, '0')}`
      monthlyStats[key] = (monthlyStats[key] || 0) + 1
    })

    // Group by years
    const yearlyStats: Record<string, number> = {}
    allRegs.forEach((reg) => {
      const { year } = getYearMonthDay(reg.createdAt)
      yearlyStats[year] = (yearlyStats[year] || 0) + 1
    })

    // 3) Return everything in a single response
    res.status(200).json({
      events,            
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
