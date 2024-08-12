"use client"

import {
  Children,
  type Component,
  type ElementType,
  type FC,
  type ReactNode,
  isValidElement,
} from "react"

// A hacky-fix for the missing `name` property
type ExtendElementType = ElementType & { name: string }

/**
 * A hook to validate one or more specified React components passed
 * through `children`
 *
 * @param childrenProp The `children` prop
 * @param allowedComponents An array of allowed components to be passed
 */
export function useValidateChildrenComponents<
  C extends ReactNode,
  RC extends FC | Component,
>(childrenProp: C, allowedComponents: RC[]) {
  return Children.map(childrenProp, (child) => {
    const isValidChildElement = isValidElement(child)

    if (
      !isValidChildElement ||
      !allowedComponents.some((allowedType) => child.type === allowedType)
    ) {
      const allowedNames = allowedComponents
        .map((type) => (type as ExtendElementType).name || type.toString())
        .join(", ")

      const invalidChildName =
        isValidChildElement && (child.type as ExtendElementType).name

      throw new Error(
        `${invalidChildName} is not a valid component. The allowed components are: ${allowedNames}.`,
      )
    }

    return child
  })
}
