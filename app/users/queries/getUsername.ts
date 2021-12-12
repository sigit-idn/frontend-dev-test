import db from "db"

export default async function getUsername(id) {
  const user = await db.user.findFirst({
    where: { id },
    select: { username: true },
  })

  return user?.username
}
