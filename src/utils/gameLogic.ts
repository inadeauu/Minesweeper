export enum GameState {
  Idol = 1,
  Playing,
  Won,
  Loss,
}

export type Tile = {
  x: number
  y: number
  mine: boolean
  minesAround: number
  isCovered: boolean
  isFlagged: boolean
  incorrectFlag: boolean
  incorrectUncover: boolean
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
        incorrectFlag: false,
        incorrectUncover: false,
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

export const uncoverBoard = (
  x: number,
  y: number,
  width: number,
  height: number,
  board: Tile[][]
) => {
  if (board[y][x].isFlagged || !board[y][x].isCovered || board[y][x].mine)
    return

  uncoverSafeTile(x, y, board)

  if (board[y][x].minesAround !== 0) return

  if (y - 1 >= 0 && x - 1 >= 0) {
    if (board[y - 1][x - 1].minesAround === 0) {
      uncoverBoard(x - 1, y - 1, width, height, board)
    } else {
      uncoverSafeTile(x - 1, y - 1, board)
    }
  }

  if (y - 1 >= 0) {
    if (board[y - 1][x].minesAround === 0) {
      uncoverBoard(x, y - 1, width, height, board)
    } else {
      uncoverSafeTile(x, y - 1, board)
    }
  }

  if (y - 1 >= 0 && x + 1 < width) {
    if (board[y - 1][x + 1].minesAround === 0) {
      uncoverBoard(x + 1, y - 1, width, height, board)
    } else {
      uncoverSafeTile(x + 1, y - 1, board)
    }
  }

  if (x - 1 >= 0) {
    if (board[y][x - 1].minesAround === 0) {
      uncoverBoard(x - 1, y, width, height, board)
    } else {
      uncoverSafeTile(x - 1, y, board)
    }
  }

  if (x + 1 < width) {
    if (board[y][x + 1].minesAround === 0) {
      uncoverBoard(x + 1, y, width, height, board)
    } else {
      uncoverSafeTile(x + 1, y, board)
    }
  }

  if (y + 1 < height && x - 1 >= 0) {
    if (board[y + 1][x - 1].minesAround === 0) {
      uncoverBoard(x - 1, y + 1, width, height, board)
    } else {
      uncoverSafeTile(x - 1, y + 1, board)
    }
  }

  if (y + 1 < height && board[y + 1][x].minesAround === 0) {
    if (board[y + 1][x].minesAround === 0) {
      uncoverBoard(x, y + 1, width, height, board)
    } else {
      uncoverSafeTile(x, y + 1, board)
    }
  }

  if (y + 1 < height && x + 1 < width) {
    if (board[y + 1][x + 1].minesAround === 0) {
      uncoverBoard(x + 1, y + 1, width, height, board)
    } else {
      uncoverSafeTile(x + 1, y + 1, board)
    }
  }
}

const uncoverSafeTile = (x: number, y: number, board: Tile[][]) => {
  if (!board[y][x].isFlagged && !board[y][x].mine) {
    board[y][x] = { ...board[y][x], isCovered: false }
  }
}

export const checkWin = (
  width: number,
  height: number,
  board: Tile[][],
  mineAmount: number
) => {
  let flaggedMines = 0

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].isFlagged && !board[i][j].mine) {
        return false
      }

      if (
        board[i][j].isCovered &&
        !board[i][j].mine &&
        !board[i][j].isFlagged
      ) {
        return false
      }

      if (board[i][j].isFlagged && board[i][j].mine) {
        flaggedMines++
      }
    }
  }

  if (flaggedMines === mineAmount) {
    return true
  }

  return false
}

export const lostGame = (width: number, height: number, board: Tile[][]) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].isFlagged && !board[i][j].mine) {
        board[i][j].incorrectFlag = true
      }

      if (board[i][j].mine) {
        board[i][j].isCovered = false
      }
    }
  }
}
