export type Tile = {
  x: number
  y: number
  mine: boolean
  minesAround: number
  isCovered: boolean
  isFlagged: boolean
}

export const initializeBoard = (width: number, height: number) => {
  const board: Tile[][] = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0))

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        x: j,
        y: i,
        mine: false,
        minesAround: 0,
        isCovered: true,
        isFlagged: false,
      }
    }
  }

  return board
}
