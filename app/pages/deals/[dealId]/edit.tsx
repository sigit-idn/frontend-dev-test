import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDeal from "app/deals/queries/getDeal"
import updateDeal from "app/deals/mutations/updateDeal"
import { DealForm, FORM_ERROR } from "app/deals/components/DealForm"

export const EditDeal = () => {
  const router = useRouter()
  const dealId = useParam("dealId", "number")
  const [deal, { setQueryData }] = useQuery(
    getDeal,
    { id: dealId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDealMutation] = useMutation(updateDeal)

  return (
    <>
      <Head>
        <title>Edit Deal {deal.title}</title>
      </Head>

      <div>
        <h1 className="text-2xl">Edit Deal</h1>
        <p className="mb-5 font-light opacity-60">{deal.title}</p>

        <DealForm
          submitText="Update Deal"
          cancelText="Cancel"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDeal}
          initialValues={deal}
          onSubmit={async (values) => {
            try {
              const updated = await updateDealMutation({
                id: deal.id,
                ...values,
              })
              await setQueryData(updated)
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
    </>
  )
}

const EditDealPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDeal />
      </Suspense>
    </div>
  )
}

EditDealPage.authenticate = true
EditDealPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDealPage