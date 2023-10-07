export type Tile = {
  x: number
  y: number
  mine: boolean
  minesAround: number
  isCovered: boolean
  isFlagged: boolean
}

export const initializeBoard = (
  width: number,
  height: number,
  mineCount: number
) => {
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

  placeMines(width, height, board, mineCount)
  checkMinesAround(width, height, board)

  return board
}

const placeMines = (
  width: number,
  height: number,
  board: Tile[][],
  mineCount: number
) => {
  let minesPlaced = 0
  const mineChance = 0.05

  while (minesPlaced < mineCount) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (Math.random() <= mineChance && !board[i][j].mine) {
          board[i][j] = { ...board[i][j], mine: true }
          minesPlaced++

          if (minesPlaced >= mineCount) {
            return
          }
        }
      }
    }
  }
}

const checkMinesAround = (width: number, height: number, board: Tile[][]) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].mine) continue

      let minesAround = 0

      if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1].mine) {
        minesAround++
      }

      if (i - 1 >= 0 && board[i - 1][j].mine) {
        minesAround++
      }

      if (i - 1 >= 0 && j + 1 < width && board[i - 1][j + 1].mine) {
        minesAround++
      }

      if (j - 1 >= 0 && board[i][j - 1].mine) {
        minesAround++
      }

      if (j + 1 < width && board[i][j + 1].mine) {
        minesAround++
      }

      if (i + 1 < height && j - 1 >= 0 && board[i + 1][j - 1].mine) {
        minesAround++
      }

      if (i + 1 < height && board[i + 1][j].mine) {
        minesAround++
      }

      if (i + 1 < height && j + 1 < width && board[i + 1][j + 1].mine) {
        minesAround++
      }

      board[i][j] = { ...board[i][j], minesAround }
    }
  }
}
