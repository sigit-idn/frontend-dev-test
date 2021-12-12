import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

console.log(z)

const CreateDeal = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["TODO", "DOING", "DONE"]),
  userId: z.string().regex(/\d+/),
  dueDate: z.date().optional(),
  boardId: z.string().optional(),
})

export default resolver.pipe(resolver.zod(CreateDeal), resolver.authorize(), async (input: any) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  input.dueDate = input.dueDate ?? new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
  input.boardId = input.boardId ?? 1
  input.userId = Number(input.userId)

  const deal = await db.deal.create({ data: input })

  return deal
})
