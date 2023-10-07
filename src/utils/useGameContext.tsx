import { useContext } from "react"
import { GameContext } from "../contexts/GameProvider"

export const useGameContext = () => {
  const gameInfo = useContext(GameContext)

  return gameInfo
}
