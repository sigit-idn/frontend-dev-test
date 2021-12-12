import React, { PropsWithoutRef, ReactNode } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  fieldProps?: UseFieldConfig<string>
  options?: Array<{ id: number; username: string } | string>
}

export const LabeledSelectField = React.forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, label, fieldProps, outerProps, options, ...props }, ref) => {
    const {
      input,
      meta: { submitting },
    } = useField(name, {
      ...((props.type === "number"
        ? { parse: (v: string) => Number(v) }
        : {
            parse: (v: string) => (v === "" ? null : v),
          }) as any),
      ...fieldProps,
    })

    return (
      <div {...outerProps} className="mb-3 flex-1">
        <div className="flex justify-between">
          <label>{label}</label>
        </div>
        <select
          {...input}
          disabled={submitting}
          {...props}
          ref={ref}
          className={`block my-1 p-2 focus:shadow-inner focus:outline-none w-full rounded border border-gray-300 ${
            /TODO|DOING|DONE/.test(JSON.stringify(options)) ? "capitalize" : ""
          }`}
        >
          {options?.map((opt, i) => {
            return (
              <option
                key={"status-" + i}
                value={typeof opt === "string" ? opt : opt.id}
                selected={opt === props.defaultValue}
              >
                {typeof opt === "string" ? opt.toLowerCase() : opt.username}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)
