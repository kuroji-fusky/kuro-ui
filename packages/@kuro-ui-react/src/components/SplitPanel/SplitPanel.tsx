"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
} from "react"

interface SplitPanelProps {
  /**
   * Default value is "768px"
   */
  windowBreakpoint: `${number}px`
  containerBreakpoint: `${number}px`
  /**
   * Default value is "300px"
   */
  shelfMinWidth: `${number}px`
}

// type MapReactComponentsAsObjects = {
//   [n: string]: (...props: any) => JSX.Element
// }

// const useDefineSlottedChildren = <RC extends MapReactComponentsAsObjects>(
//   childProp: ReactNode,
//   definedComponentSlots: RC,
// ): RC => {
//   return Children.map
// }

function Root(props: PropsWithChildren<SplitPanelProps>) {
  const VALID_COMPONENTS = {
    Shelf,
    Content,
  }

  // This func does nothing special, it just validates components
  // and re-returns the specified vaild components lol
  // TODO: might add a fallback if neither of the children is specified
  // TODO: so it doesn't throw an error
  // const VALID_COMPONENTS = {
  //  Shelf: [Shelf, <fallback component>],
  //  Shelf,
  // }
  const mappedChildren = Children.map(props.children, (child) => {
    const validComponentArr = Object.values(VALID_COMPONENTS)

    if (
      !isValidElement(child) ||
      !validComponentArr.some((vaildComponent) => child.type === vaildComponent)
    ) {
      // throw some error here
    }

    return VALID_COMPONENTS
  })

  return (
    <div>
      <div></div>
      <div>{props.children}</div>
    </div>
  )
}

function Shelf(props: PropsWithChildren) {
  return <div>{props.children}</div>
}
function Content(props: PropsWithChildren) {
  return <div>{props.children}</div>
}

export const SplitPanel = Object.assign(Root, { Shelf, Content })
