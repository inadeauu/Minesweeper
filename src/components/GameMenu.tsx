import { useState } from "react"
import { useGameContext } from "../utils/useGameContext"
import Slider from "./Slider"
import { initializeBoard } from "../utils/gameLogic"

const GameMenu = () => {
  const gameInfo = useGameContext()

  const [width, setWidth] = useState(gameInfo.boardWidth)
  const [height, setHeight] = useState(gameInfo.boardHeight)

  const createNewBoard = () => {
    gameInfo.setBoardWidth(width)
    gameInfo.setBoardHeight(height)
    gameInfo.setBoard(initializeBoard(width, height))
  }

  return (
    <div className="flex items-center mx-auto gap-4">
      <div className="table border-spacing-x-2 border-spacing-y-2">
        <div className="table-row">
          <label className="table-cell min-w-[85px]">Width: {width}</label>
          <Slider
            value={width}
            setValue={setWidth}
            minValue={5}
            maxValue={50}
          />
        </div>
        <div className="table-row">
          <label className="table-cell min-w-[85px]">Height: {height}</label>
          <Slider
            value={height}
            setValue={setHeight}
            minValue={5}
            maxValue={50}
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
