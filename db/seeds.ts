import db from "./index"
import faker from "faker/locale/en"
import { SecurePassword } from "blitz"
import { Status } from "@prisma/client"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  try {
    await db.deal.deleteMany({})
    await db.user.deleteMany({})
    await db.board.deleteMany({})

    const password = await SecurePassword.hash("password")

    await db.user.createMany({
      data: Array.from(
        { length: 5 },
        (_, i) =>
          new (function () {
            this.name = !i ? "admin" : faker.name.findName()
            this.username = this.name
              .match(/\w{4,}/g)
              .join("_")
              .toLowerCase()
            this.hashedPassword = password
          })()
      ),
    })

    await db.board.createMany({
      data: Array.from({ length: 5 }, () => ({
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
      })),
    })

    await db.deal.createMany({
      data: Array.from({ length: 50 }, () => ({
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
        status: [Status.TODO, Status.DOING, Status.DONE][Math.floor(Math.random() * 3)],
        userId: Math.ceil(Math.random() * 5),
        dueDate: new Date(new Date().getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000),
        boardId: Math.ceil(Math.random() * 5),
      })),
    })
  } catch (err) {
    console.error(err)
  }
}

export default seed
