type Props = {
  size?: number
  onCellClick?: (index: number) => void
  renderCell?: (index: number) => string
}

export default function Board({
  size = 8,
  onCellClick,
  renderCell
}: Props) {
  const cells = Array.from({ length: size * size })

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gap: 4,
        maxWidth: 480
      }}
    >
      {cells.map((_, index) => (
        <button
          key={index}
          onClick={() => onCellClick?.(index)}
          style={{
            aspectRatio: '1'
          }}
        >
          {renderCell?.(index)}
        </button>
      ))}
    </div>
  )
}
