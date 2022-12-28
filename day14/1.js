const fs = require('fs');

const POINT_SPLIT = '->'
const COORDINATE_SPLIT = ','

const SAND_DROP_POINT = [500, 0]

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(POINT_SPLIT).map(p => p.split(COORDINATE_SPLIT)))
    .reduce((result, pointList) => (
      [...result, ...pointList.map((p, index, list) => index !== list.length - 1 ? [p, list[index + 1]] : null).filter(Boolean)]
    ), [])


  const maxYCoordinate = Math.max(...data.map(r => Math.max(r[0][1], r[1][1])))
  let blockDict = data.reduce((acc, [firstPoint, secondPoint]) => {
    const offsetX = firstPoint[0] - secondPoint[0]
    const offsetY = firstPoint[1] - secondPoint[1]
    const iterations = Math.max(offsetX, offsetY)
    Array.from({length: iterations + 1}).forEach((_, i) => {
      let x = firstPoint[0]
      if (offsetX) {
        x = Math.min(firstPoint[0], secondPoint[0]) + i
      }
      let y = firstPoint[1]
      if (offsetY) {
        y = Math.min(firstPoint[1], secondPoint[1]) + i
      }
      acc[`${x}-${y}`] = true
    })
    return acc
  }, {})

  let abyssReached = true
  let sandIndex = 0
  while(!abyssReached) {
    sandIndex + 1

    let currentPosition = SAND_DROP_POINT
    while (currentPosition[1] <= maxYCoordinate) {

    }
  }

  console.log(blockDict)

}

main();
