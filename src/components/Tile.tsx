import {
  GameState,
  Tile,
  checkWin,
  lostGame,
  uncoverBoard,
} from "../utils/gameLogic"
import Cover from "../assets/cover.png"
import Mine from "../assets/mine.png"
import Flag from "../assets/flag_covered.png"
import IncorrectFlag from "../assets/mine_wrong.png"
import { useGameContext } from "../utils/useGameContext"
import React from "react"
import { tileColor } from "../utils/helpers"
import { cloneDeep } from "lodash"

type TileProps = {
  tile: Tile
}

const Tile = React.memo(({ tile }: TileProps) => {
  const gameInfo = useGameContext()

  const uncoverTile = () => {
    if (
      (gameInfo.gameState !== GameState.Playing &&
        gameInfo.gameState !== GameState.Idol) ||
      tile.isFlagged
    )
      return

    const updatedBoard = cloneDeep(gameInfo.board)

    if (tile.isCovered) {
      updatedBoard[tile.y][tile.x] = {
        ...updatedBoard[tile.y][tile.x],
        incorrectUncover: tile.mine,
      }

      uncoverBoard(
        tile.x,
        tile.y,
        gameInfo.boardWidth,
        gameInfo.boardHeight,
        updatedBoard
      )

      if (tile.mine) {
        lostGame(gameInfo.boardWidth, gameInfo.boardHeight, updatedBoard)

        gameInfo.setGameState(GameState.Loss)
      } else {
        if (
          checkWin(
            gameInfo.boardWidth,
            gameInfo.boardHeight,
            updatedBoard,
            gameInfo.mineAmount
          )
        ) {
          gameInfo.setGameState(GameState.Won)
        }
      }

      gameInfo.setBoard(updatedBoard)
    }
  }

  const flagTile = () => {
    if (
      (gameInfo.gameState !== GameState.Playing &&
        gameInfo.gameState !== GameState.Idol) ||
      !tile.isCovered
    )
      return

    const updatedBoard = cloneDeep(gameInfo.board)

    updatedBoard[tile.y][tile.x] = {
      ...updatedBoard[tile.y][tile.x],
      isFlagged: !updatedBoard[tile.y][tile.x].isFlagged,
    }

    if (
      checkWin(
        gameInfo.boardWidth,
        gameInfo.boardHeight,
        updatedBoard,
        gameInfo.mineAmount
      )
    ) {
      gameInfo.setGameState(GameState.Won)
    }

    gameInfo.setBoard(updatedBoard)
  }

  return (
    <div
      className={`flex items-center justify-center w-[30px] h-[30px] border-[.5px] border-black ${
        !tile.isCovered || tile.isFlagged
          ? "cursor-default"
          : gameInfo.gameState !== GameState.Loss && "cursor-pointer"
      } ${tile.incorrectUncover ? "bg-red-400" : "bg-neutral-300"}`}
      onClick={() => uncoverTile()}
      onContextMenu={(e) => {
        e.preventDefault()
        flagTile()
      }}
    >
      {tile.incorrectFlag ? (
        <img src={IncorrectFlag} />
      ) : tile.isFlagged ? (
        <img src={Flag} />
      ) : tile.isCovered ? (
        <img src={Cover} />
      ) : tile.incorrectUncover || tile.mine ? (
        <img src={Mine} />
      ) : (
        tile.minesAround > 0 && (
          <span
            className={`text-2xl font-extrabold ${tileColor(tile.minesAround)}`}
          >
            {tile.minesAround}
          </span>
        )
      )}
    </div>
  )
})

export default Tile
