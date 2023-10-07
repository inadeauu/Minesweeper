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
      <div className="flex gap-4 sm-max:flex-col">
        <Slider
          label="Width"
          value={width}
          setValue={setWidth}
          minValue={5}
          maxValue={50}
        />
        <Slider
          label="Height"
          value={height}
          setValue={setHeight}
          minValue={5}
          maxValue={50}
        />
      </div>
      <button
        className="bg-primary text-white rounded-md py-1 px-2 text-sm hover:bg-blue-600 sm:self-end sm-max:mt-5"
        onClick={() => createNewBoard()}
      >
        New Game
      </button>
    </div>
  )
}

export default GameMenu
