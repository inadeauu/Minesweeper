export const progress = (value: number, minValue: number, maxValue: number) => {
  const progress = ((value - minValue) / (maxValue - minValue)) * 100

  if (value <= (minValue + maxValue) / 2) {
    return Math.ceil(progress)
  }

  return Math.floor(progress)
}
