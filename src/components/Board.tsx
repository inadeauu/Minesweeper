import { useGameContext } from "../utils/useGameContext"
import Tile from "./Tile"

const Board = () => {
  const { board, boardWidth, boardHeight } = useGameContext()

  return (
    <div className="mx-4 mb-4">
      <div className="flex justify-center mx-auto w-fit border-2 border-black">
        <div className="flex flex-col">
          {Array.from({ length: boardHeight }, (_, idxY) => (
            <div key={"board-row" + idxY} className="flex">
              {Array.from({ length: boardWidth }, (_, idxX) => (
                <div key={"board-tile" + (idxY * boardWidth + idxX)}>
                  <Tile tile={board[idxY][idxX]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Board
