import { Form, FormProps } from "app/core/components/Form"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getUsers from "app/users/queries/getUsers"
import { useRouter } from "blitz"
import { useEffect, useState } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function DealForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [users, setUsers] = useState<any>([])
  useEffect(() => {
    getUsers().then((users) => setUsers(users))
  }, [])

  return (
    <Form<S> {...props} className="bg-white shadow rounded-md p-5">
      <div className="flex w-full space-x-5">
        <LabeledTextField name="title" className="w-full" label="Title" placeholder="Title" />
        <LabeledSelectField
          label="Asigned to"
          name="userId"
          className="block my-1 p-2 pb-3 focus:shadow-inner focus:outline-none w-full rounded border border-gray-300"
          options={[
            "Select a user",
            ...users.map(({ id, username }) => ({
              id,
              username,
            })),
          ]}
        ></LabeledSelectField>
      </div>
      <LabeledTextField name="description" label="Description" placeholder="Description" textarea />

      <LabeledSelectField
        label="Status"
        name="status"
        className="block my-1 p-2 pb-3 focus:shadow-inner focus:outline-none w-full rounded border border-gray-300"
        options={["TODO", "DOING", "DONE"]}
      >
        <option>Select a status</option>
      </LabeledSelectField>
      <div className="bg-gray-100"></div>
    </Form>
  )
}
