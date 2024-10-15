import { createContext, type PropsWithChildren } from "react"
import { AccordionItem } from "./AccordionItem"
import { useValidateChildrenComponents } from "../../hooks"

interface AccordionRootProps {
  /**
   * Whether or not it's children should allow only one item to be expanded.
   */
  collapsible?: boolean
}

interface AccordionContextProps {
  canBeExpandable?: boolean
  currentIndex: number | null
}

export const AccordionContext = createContext<AccordionContextProps>({
  canBeExpandable: false,
  currentIndex: null,
})

export function AccordionRoot(props: PropsWithChildren<AccordionRootProps>) {
  const accordionChildren = useValidateChildrenComponents(props.children, [
    AccordionItem,
  ])

  return (
    <AccordionContext.Provider
      value={{
        canBeExpandable: props.collapsible ?? false,
        currentIndex: null,
      }}
    >
      {accordionChildren}
    </AccordionContext.Provider>
  )
}
