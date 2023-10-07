import { Tile } from "../utils/gameLogic"
import Cover from "../assets/cover.png"
import Mine from "../assets/mine.png"
import { useGameContext } from "../utils/useGameContext"
import React from "react"

type TileProps = {
  tile: Tile
}

const Tile = React.memo(({ tile }: TileProps) => {
  const { board, setBoard } = useGameContext()

  return (
    <div
      className="w-[25px] h-[25px] cursor-pointer border-[.5px] border-black"
      onClick={() => {
        if (tile.isCovered) {
          setBoard(
            board.map((row) => {
              return row.map((t) => {
                if (t.x == tile.x && t.y == tile.y) {
                  return {
                    ...t,
                    isCovered: false,
                  }
                }

                return t
              })
            })
          )
        }
      }}
    >
      {tile.isCovered ? <img src={Cover} /> : tile.mine && <img src={Mine} />}
    </div>
  )
})

export default Tile
