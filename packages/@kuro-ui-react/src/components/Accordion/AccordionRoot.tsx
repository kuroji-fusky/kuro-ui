import { createContext, Children, type PropsWithChildren } from "react"

interface AccordionRootProps {
  /**
   * Whether or not it's children should allow only one item to be expanded.
   */
  collapsible?: boolean
}

const AccordionContext = createContext<{ canBeExpandable: boolean }>({
  canBeExpandable: false,
})

export function AccordionRoot(props: PropsWithChildren<AccordionRootProps>) {
  return (
    <AccordionContext.Provider
      value={{ canBeExpandable: props.collapsible ?? false }}
    >
      <div>{props.children}</div>
    </AccordionContext.Provider>
  )
}
