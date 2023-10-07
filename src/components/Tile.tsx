import { Tile } from "../utils/gameLogic"
import Cover from "../assets/cover.png"

type TileProps = {
  tile: Tile
}

const Tile = ({ tile }: TileProps) => {
  return (
    <div className="w-[25px] h-[25px]">
      <img src={Cover} />
    </div>
  )
}

export default Tile
