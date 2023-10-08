import React, { createContext, useState } from "react"
import { Tile, initializeBoard } from "../utils/gameLogic"
import { GameState } from "../utils/gameLogic"

type GameProviderProps = {
  children: React.ReactNode
}
type GameContext = {
  MINDIM: number
  MAXDIM: number
  MINMINES: 5
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  board: Tile[][]
  setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>
  boardWidth: number
  setBoardWidth: React.Dispatch<React.SetStateAction<number>>
  boardHeight: number
  setBoardHeight: React.Dispatch<React.SetStateAction<number>>
  mineAmount: number
  setMineAmount: React.Dispatch<React.SetStateAction<number>>
}

export const GameContext = createContext<GameContext>({} as GameContext)

const GameProvider = ({ children }: GameProviderProps) => {
  const MINDIM = 5
  const MAXDIM = 50
  const MINMINES = 5

  const [gameState, setGameState] = useState<GameState>(GameState.Idol)
  const [boardWidth, setBoardWidth] = useState(10)
  const [boardHeight, setBoardHeight] = useState(10)
  const [mineAmount, setMineAmount] = useState(10)

  const [board, setBoard] = useState<Tile[][]>(
    initializeBoard(boardWidth, boardHeight, mineAmount)
  )

  return (
    <GameContext.Provider
      value={{
        MINDIM,
        MAXDIM,
        MINMINES,
        gameState,
        setGameState,
        board,
        setBoard,
        boardWidth,
        setBoardWidth,
        boardHeight,
        setBoardHeight,
        mineAmount,
        setMineAmount,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
