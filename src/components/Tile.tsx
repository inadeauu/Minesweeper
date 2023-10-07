import { Tile } from "../utils/gameLogic"
import Cover from "../assets/cover.png"

type TileProps = {
  tile: Tile
}

const Tile = ({ tile }: TileProps) => {
  return (
    <div className="w-[25px] h-[25px] cursor-pointer border-[.5px] border-black">
      <img src={Cover} />
    </div>
  )
}

export default Tile
