import {Budget, PrismaClient} from "@prisma/client";
import {z} from 'zod'

export const BudgetRequest = z.object({
  label: z.string(),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
  userId: z.string()
})

const BudgetResponse = BudgetRequest.extend({
  createdAt: z.string().transform((val) => new Date(val)),
  id: z.number(),
})

export const BudgetsResponse = z.array(BudgetResponse)

export const createBudget = async ({
  label,
  startDate,
  endDate,
  userId,
 }: {label: string, startDate: Date, endDate: Date, userId: string}) => {
  let budget
  let prisma
  try {
    prisma = new PrismaClient()

    budget = await prisma.budget.create({
      data: {
        label,
        userId,
        startDate,
        endDate,
        createdAt: new Date,
      }
    })
  } catch (error) {
    console.log('error creating budget')
  } finally {
    await prisma?.$disconnect()
  }

  return budget
}

export const getBudgets = async ({userId}: {userId: string}) => {
  let prisma
  let budgets: Budget[] = [];
  try {
    prisma = new PrismaClient()
    budgets = await prisma.budget.findMany({
      where: {
        userId: {
          equals: userId
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

  } catch (error) {
    console.log(error)
  } finally {
    await prisma?.$disconnect()
  }

  return budgets
}
