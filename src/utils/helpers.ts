export const progress = (value: number, minValue: number, maxValue: number) => {
  const progress = ((value - minValue) / (maxValue - minValue)) * 100

  if (value <= (minValue + maxValue) / 2) {
    return Math.ceil(progress)
  }

  return Math.floor(progress)
}

export const tileColor = (minesAround: number) => {
  if (minesAround === 1) {
    return "text-blue-600"
  } else if (minesAround === 2) {
    return "text-green-600"
  } else if (minesAround === 3) {
    return "text-red-600"
  } else if (minesAround === 4) {
    return "text-blue-800"
  } else if (minesAround === 5) {
    return "text-red-800"
  } else if (minesAround === 6) {
    return "text-teal-600"
  } else if (minesAround === 7) {
    return "text-amber-800"
  } else if (minesAround === 8) {
    return "text-gray-400"
  } else {
    return "text-black"
  }
}
