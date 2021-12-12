import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBoard from "app/boards/queries/getBoard"
import deleteBoard from "app/boards/mutations/deleteBoard"
import getDeals from "app/deals/queries/getDeals"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import updateDeal from "app/deals/mutations/updateDeal"

export const Board = () => {
  const boardId = useParam("boardId", "number")
  // const [deleteBoardMutation] = useMutation(deleteBoard)
  const [updateDealMutation] = useMutation(updateDeal)
  const [board] = useQuery(getBoard, { id: boardId })
  const { deals: dealsResult } = useQuery(getDeals, { where: { boardId } })[0]
  const [deals, setDeals] = useState(dealsResult)
  const dragEndHandler = (result) => {
    if (!result.destination) return

    const newDeals = deals.map((deal) => {
      if (deal.id == result.draggableId.match(/\d+/)[0]) {
        deal.status = result.destination.droppableId.match(/TODO|DOING|DONE/)[0]
      }
      const { createdAt, updatedAt, assigned_to, ...updateData } = deal

      updateDealMutation({
        ...updateData,
        status: String(deal.status),
      }).catch((err) => console.error(err))

      return deal
    })
    setDeals(newDeals)
  }

  return (
    <>
      <Head>
        <title>{board.title}</title>
      </Head>

      <div>
        <h1 className="text-2xl mb-3">
          <span className="font-light">Board </span>
          {board.title}
        </h1>

        <div className="flex justify-between md:space-x-8  flex-col md:flex-row">
          <DragDropContext onDragEnd={dragEndHandler}>
            {["TODO", "DOING", "DONE"].map((status, i) => (
              <DealGroup
                key={i}
                status={status}
                deals={deals.filter((deal) => deal.status === status)}
              />
            ))}
          </DragDropContext>
        </div>

        {/* <Link href={Routes.EditBoardPage({ boardId: board.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBoardMutation({ id: board.id })
              router.push(Routes.BoardsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button> */}
      </div>
    </>
  )
}

const DealGroup = ({ status, deals }) => {
  return (
    <div className="bg-stone-500 bg-opacity-10 flex-1 max-h-screen mb-12 w-full rounded-xl overflow-y-scroll p-2">
      <h2 className="text-lg capitalize px-5 py-3">{status.toLowerCase()}</h2>

      <Link href={Routes.NewDealPage({ status })}>
        <a className="text-indigo-500 bg-white block text-center rounded-lg py-2 mb-3">
          Add a Deal
        </a>
      </Link>

      <Droppable droppableId={"deal" + status} type="GROUP">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {!deals.length ? (
              <Draggable key={"empty"} draggableId={"empty"} index={0} id={"empty"}>
                {(provided) => (
                  <li
                    className="mb-2 w-full h-72"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  ></li>
                )}
              </Draggable>
            ) : (
              deals.map((deal, i) => (
                <Draggable
                  key={"deal" + deal.id}
                  draggableId={"deal" + deal.id}
                  index={i}
                  id={"deal" + deal.id}
                >
                  {(provided) => (
                    <li
                      className="bg-white rounded-lg mb-2 overflow-hidden"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Link href={Routes.EditDealPage({ dealId: deal.id })}>
                        <a>
                          <div className="p-5 ">{deal.title}</div>
                          <div className="p-5 text-sm font-light bg-gray-100">
                            <span className="text-gray-600">Assigned to </span>
                            {deal.assigned_to.username}
                          </div>
                        </a>
                      </Link>
                    </li>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

const ShowBoardPage: BlitzPage = () => {
  return (
    <div>
      <div></div>
      <Suspense fallback={<div>Loading...</div>}>
        <Board />
      </Suspense>
    </div>
  )
}

ShowBoardPage.authenticate = true
ShowBoardPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBoardPage
