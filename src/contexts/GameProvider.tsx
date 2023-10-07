import React, { createContext, useState } from "react"
import { Tile, initializeBoard } from "../utils/gameLogic"

type GameProviderProps = {
  children: React.ReactNode
}

type GameContext = {
  board: Tile[][]
  setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>
  boardWidth: number
  setBoardWidth: React.Dispatch<React.SetStateAction<number>>
  boardHeight: number
  setBoardHeight: React.Dispatch<React.SetStateAction<number>>
}

export const GameContext = createContext<GameContext>({} as GameContext)

const GameProvider = ({ children }: GameProviderProps) => {
  const [boardWidth, setBoardWidth] = useState(15)
  const [boardHeight, setBoardHeight] = useState(15)

  const [board, setBoard] = useState<Tile[][]>(
    initializeBoard(boardWidth, boardHeight)
  )

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        boardWidth,
        setBoardWidth,
        boardHeight,
        setBoardHeight,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
