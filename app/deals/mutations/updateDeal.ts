import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDeal = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  description: z.string().nullable(),
  dueDate: z.date(),
})

export default resolver.pipe(
  resolver.zod(UpdateDeal),
  resolver.authorize(),
  async ({ id, ...data }: any) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const deal = await db.deal.update({ where: { id }, data })

    return deal
  }
)
