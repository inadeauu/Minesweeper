type SliderProps = {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  minValue: number
  maxValue: number
}

const Slider = ({
  label,
  value,
  setValue,
  minValue,
  maxValue,
}: SliderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <span>{label}: </span>
        <span>{value}</span>
      </div>
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
