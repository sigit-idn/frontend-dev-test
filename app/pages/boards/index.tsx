import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBoards from "app/boards/queries/getBoards"

const ITEMS_PER_PAGE = 100

export const BoardsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ boards, hasMore }] = usePaginatedQuery(getBoards, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {boards.map((board) => (
          <li
            key={board.id}
            className="border-b border-gray-300 py-3 px-6 flex justify-between items-center"
          >
            <Link href={Routes.ShowBoardPage({ boardId: board.id })}>
              <a>
                <div>{board.title}</div>
                <p className="font-light text-gray-600">{board.description}</p>
              </a>
            </Link>
            <Link href={Routes.EditBoardPage({ boardId: board.id })}>
              <a className="text-indigo-600 font-light">Edit</a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        {page ? (
          <button disabled={!page} className="mr-5 text-indigo-500" onClick={goToPreviousPage}>
            Previous
          </button>
        ) : null}
        {hasMore ? (
          <button disabled={!hasMore} className=" text-indigo-500" onClick={goToNextPage}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  )
}

const BoardsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Boards</title>
      </Head>

      <h1 className="text-3xl">Boards</h1>
      <p className="text-gray-600 font-light">Here are all boards</p>

      <div className="rounded-lg bg-white shadow overflow-hidden my-6">
        <div className="bg-gray-100 border-b border-gray-300 px-6 py-2 text-gray-600">NAME</div>
        <Suspense fallback={<div>Loading...</div>}>
          <BoardsList />
        </Suspense>

        <div className="flex justify-end p-6 text-indigo-500">
          <Link href={Routes.NewBoardPage()}>
            <a>Create Board</a>
          </Link>
        </div>
      </div>
    </>
  )
}

BoardsPage.authenticate = true
BoardsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BoardsPage
