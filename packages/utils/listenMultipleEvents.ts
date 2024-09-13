interface ListenMultiEventOptions {
  /** Call the function immediately upon initialization */
  callOnInit?: boolean
}

export const listenMultipleEvents = <T extends Element | Window>(
  target: T,
  definedEvents: string[],
  callback: (e?: unknown) => void,
  options?: ListenMultiEventOptions,
) => {
  if (
    Array.isArray(definedEvents) &&
    definedEvents.some((x) => typeof x !== "string")
  )
    return

  if (options && options.callOnInit) callback()

  definedEvents.forEach((event) => target.addEventListener(event, callback))
}
