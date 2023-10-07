import { useState } from "react"
import { useGameContext } from "../utils/useGameContext"
import { initializeBoard } from "../utils/gameLogic"

const GameMenu = () => {
  const gameInfo = useGameContext()

  const [width, setWidth] = useState(gameInfo.boardWidth)
  const [height, setHeight] = useState(gameInfo.boardHeight)
  const [mines, setMines] = useState(gameInfo.mineAmount)

  const onDimensionChange = (width: number, height: number) => {
    if (mines > width * height - 1) {
      setMines(width * height - 1)
    }
  }

  const createNewBoard = () => {
    gameInfo.setBoardWidth(width)
    gameInfo.setBoardHeight(height)
    gameInfo.setMineAmount(mines)
    gameInfo.setBoard(initializeBoard(width, height))
  }

  return (
    <div className="flex items-center mx-auto gap-4">
      <div className="table border-spacing-x-2 border-spacing-y-2">
        <div className="table-row">
          <label className="table-cell min-w-[95px]">Width: {width}</label>
          <input
            className="slider"
            type="range"
            value={width}
            min={gameInfo.MINDIM}
            max={gameInfo.MAXDIM}
            onChange={(e) => {
              setWidth(e.target.valueAsNumber)
              onDimensionChange(e.target.valueAsNumber, height)
            }}
            style={
              {
                "--progress": `${(width / gameInfo.MAXDIM) * 100 - 1}%`,
              } as React.CSSProperties
            }
          />
        </div>
        <div className="table-row">
          <label className="table-cell">Height: {height}</label>
          <input
            className="slider"
            type="range"
            value={height}
            min={gameInfo.MINDIM}
            max={gameInfo.MAXDIM}
            onChange={(e) => {
              setHeight(e.target.valueAsNumber)
              onDimensionChange(width, e.target.valueAsNumber)
            }}
            style={
              {
                "--progress": `${(height / gameInfo.MAXDIM) * 100 - 1}%`,
              } as React.CSSProperties
            }
          />
        </div>
        <div className="table-row">
          <label className="table-cell">Mines: {mines}</label>
          <input
            className="slider"
            type="range"
            value={mines}
            min={gameInfo.MINMINES}
            max={width * height - 1}
            onChange={(e) => {
              setMines(e.target.valueAsNumber)
            }}
            style={
              {
                "--progress": `${(mines / (width * height - 1)) * 100 - 1}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
      <button
        className="bg-primary text-white rounded-md py-1 px-2 text-sm hover:bg-blue-600"
        onClick={() => createNewBoard()}
      >
        New Game
      </button>
    </div>
  )
}

export default GameMenu
