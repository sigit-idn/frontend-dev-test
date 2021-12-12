import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDeal from "app/deals/mutations/createDeal"
import { DealForm, FORM_ERROR } from "app/deals/components/DealForm"

const NewDealPage: BlitzPage = () => {
  const router = useRouter()
  const [createDealMutation] = useMutation(createDeal)

  return (
    <div>
      <h1 className="text-xl">Create a New Deal</h1>
      <p className="font-light text-gray-700 mb-5">Use this form to create a new deal</p>

      <DealForm
        initialValues={{ status: router.query.status }}
        submitText="Create Deal"
        cancelText="Cancel"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDeal}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const deal = await createDealMutation(values)
            router.push(Routes.ShowBoardPage({ boardId: deal.boardId }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewDealPage.authenticate = true
NewDealPage.getLayout = (page) => <Layout title={"Create New Deal"}>{page}</Layout>

export default NewDealPage
