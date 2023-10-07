import { useState } from "react"
import Slider from "../components/Slider"

const GameMenu = () => {
  const [width, setWidth] = useState(15)
  const [height, setHeight] = useState(15)

  return (
    <div>
      <div className="flex gap-4">
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
    </div>
  )
}

export default GameMenu
