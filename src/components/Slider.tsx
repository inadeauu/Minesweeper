type SliderProps = {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  minValue: number
  maxValue: number
}

const Slider = ({ value, setValue, minValue, maxValue }: SliderProps) => {
  return (
    <div className="flex gap-1">
      <input
        type="range"
        value={value}
        min={minValue}
        max={maxValue}
        onChange={(e) => setValue(e.target.valueAsNumber)}
        className="slider"
        style={
          {
            "--progress": `${(value / maxValue) * 100 - 1}%`,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

export default Slider
