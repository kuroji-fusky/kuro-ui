"use client"

import type { PropsWithChildren } from "react"

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

function Root(props: PropsWithChildren<SplitPanelProps>) {
  return <div>{props.children}</div>
}
function Shelf(props: PropsWithChildren) {
  return <div>{props.children}</div>
}
function Content(props: PropsWithChildren) {
  return <div>{props.children}</div>
}

export const SplitPanel = Object.assign(Root, { Shelf, Content })
