import { TableBodyTD } from '../main/styled'

export default function TableCell({ isSelected, percents, isSame, onClick }) {
  const alphaChannel = percents > 10 ? Math.abs(percents) / 100 : 0.1
  const backgroundColor = percents > 0 ? `rgba(0, 200, 0, ${alphaChannel})` : `rgba(255, 0, 0, ${alphaChannel})`
  const fontWeight = isSelected ? 'bold' : 'inherit'
  const cursor = "pointer"

  if (percents !== 0 && !isSame) {
    return <TableBodyTD onMouseEnter={onClick} style={{ backgroundColor, cursor, fontWeight }}>{`${percents}%`}</TableBodyTD>
  } else if (isSame) {
    return <TableBodyTD>-</TableBodyTD>
  } else {
    return <TableBodyTD onMouseEnter={onClick}>0%</TableBodyTD>
  }
}