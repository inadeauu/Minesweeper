type BoardProps = {
  width: number
  height: number
}

const Board = ({ width, height }: BoardProps) => {
  return (
    <div>
      {width} {height}
    </div>
  )
}

export default Board
