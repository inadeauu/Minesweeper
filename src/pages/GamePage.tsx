import Board from "../components/Board"
import GameMenu from "../components/GameMenu"

const GamePage = () => {
  return (
    <div className="flex flex-col gap-2 w-fit mx-auto">
      <GameMenu />
      <Board />
    </div>
  )
}

export default GamePage
