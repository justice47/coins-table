export default function TableCell({ percents, isSame }) {
  const alphaChannel = percents > 10 ? Math.abs(percents) / 100 : 0.1
  

  if (percents > 0) {
    return <td style={{backgroundColor: `rgba(0, 200, 0, ${alphaChannel})`}}>{`${percents}%`}</td>
  } else if (percents < 0) {
    return <td style={{backgroundColor: `rgba(255, 0, 0, ${alphaChannel})`}}>{`${percents}%`}</td>
  } else if (isSame) {
    return <td>-</td>
  } else {
    return <td>0%</td>
  }
}