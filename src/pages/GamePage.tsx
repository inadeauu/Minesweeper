import { useState } from "react"
import Board from "../components/Board"
import Slider from "../components/Slider"

const GamePage = () => {
  const [width, setWidth] = useState(15)
  const [height, setHeight] = useState(15)

  return (
    <div>
      <div className="flex items-center gap-4">
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
        <button className="bg-primary text-white rounded-md py-1 px-2 text-sm hover:bg-blue-600 self-end">
          New Game
        </button>
      </div>
      <Board width={width} height={height} />
    </div>
  )
}

export default GamePage
