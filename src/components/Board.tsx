import { useGameContext } from "../utils/useGameContext"
import Tile from "./Tile"

const Board = () => {
  const { board, boardWidth, boardHeight } = useGameContext()

  return (
    <div className="flex justify-center p-2">
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
  )
}

export default Board
