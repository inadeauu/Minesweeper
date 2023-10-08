import { GameState } from "../utils/gameLogic"
import { useGameContext } from "../utils/useGameContext"

const OutcomeIndicator = () => {
  const { gameState } = useGameContext()

  const won = gameState === GameState.Won
  const lost = gameState === GameState.Loss

  return (
    <>
      {(won || lost) && (
        <div
          className={`mx-auto mb-2 border-2 border-black rounded-md px-4 font-bold ${
            won ? "bg-yellow-400 text-black" : "bg-red-400 text-white"
          }`}
        >
          <span className="bg-">{won ? "Won" : "Lost"}</span>
        </div>
      )}
    </>
  )
}

export default OutcomeIndicator
