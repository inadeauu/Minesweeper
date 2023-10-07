type SliderProps = {
  val: number
  minVal: number
  maxVal: number
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Slider = ({ val, minVal, maxVal }: SliderProps) => {
  return (
    <div className="flex gap-1">
      <input
        type="range"
        min={minVal}
        max={maxVal}
        className="slider"
        style={
          {
            "--progress": `${(val / maxVal) * 100 - 1}%`,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

export default Slider
