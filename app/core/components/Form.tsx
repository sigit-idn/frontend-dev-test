import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { useRouter, validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  cancelText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  cancelText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const router = useRouter()
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          <div className="flex justify-end mt-5 bg-gray-50 px-6 py-3">
            {cancelText && (
              <button
                type="button"
                className="bg-white border border-gray-300 px-3 py-1 rounded mr-5"
                onClick={() => router.back()}
              >
                {cancelText}
              </button>
            )}

            {submitText && (
              <button
                type="submit"
                className="bg-indigo-600 text-white px-3 py-1 rounded mr-0"
                disabled={submitting}
              >
                {submitText}
              </button>
            )}
          </div>

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
