interface CalcRelativeValueOptions {
  capMin?: number
  capMax?: number
}

export const calcRelativeValue = (
  currentValue: number,
  maxValue: number,
  options?: CalcRelativeValueOptions,
) => {
  const relativeVal = (currentValue / maxValue) * 100

  if (options) {
    const capMinFallback = options.capMin ?? 0
    const capMaxFallback = options.capMax ?? 100

    if (relativeVal <= capMinFallback) return capMinFallback
    if (relativeVal >= capMaxFallback) return capMaxFallback

    return relativeVal
  }
  return relativeVal
}
