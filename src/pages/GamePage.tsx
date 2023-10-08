import Board from "../components/Board"
import GameMenu from "../components/GameMenu"
import OutcomeIndicator from "../components/OutcomeIndicator"

const GamePage = () => {
  return (
    <div className="flex flex-col gap-2 w-fit mx-auto">
      <GameMenu />
      <OutcomeIndicator />
      <Board />
    </div>
  )
}

export default GamePage
