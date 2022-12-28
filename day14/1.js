const fs = require('fs');

const POINT_SPLIT = '->'
const COORDINATE_SPLIT = ','

const SAND_DROP_POINT = [500, 0]

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(POINT_SPLIT).map(p => p.split(COORDINATE_SPLIT).map(n => parseInt(n, 10))))
    .reduce((result, pointList) => (
      [...result, ...pointList.map((p, index, list) => index !== list.length - 1 ? [p, list[index + 1]] : null).filter(Boolean)]
    ), [])


  const maxYCoordinate = Math.max(...data.map(r => Math.max(r[0][1], r[1][1])))
  const minYCoordinate = Math.min(...data.map(r => Math.min(r[0][1], r[1][1])))
  const maxXCoordinate = Math.max(...data.map(r => Math.max(r[0][0], r[1][0])))
  const minXCoordinate = Math.min(...data.map(r => Math.min(r[0][0], r[1][0])))
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
      acc[x] = acc[x] || {}
      acc[x][y] = true
    })
    return acc
  }, {})

  const markPosition = (x, y) => {
    blockDict[x] = blockDict[x] || {}
    blockDict[x][y] = true
  }

  let abyssReached = true
  let sandIndex = 0
  while(!abyssReached) {
    sandIndex + 1

    let [currentX, currentY] = SAND_DROP_POINT
    let restReached = false
    while (currentY <= maxYCoordinate && !restReached) {
      console.log(currentX, currentY)
      if (!blockDict[currentX][currentY + 1]) {
        currentY = currentY + 1
        continue
      }
      if (!blockDict[currentX - 1][currentY + 1]) {
        currentX = currentX - 1
        currentY = currentY + 1
        continue
      }
      if (!blockDict[currentX + 1][currentY + 1]) {
        currentX = currentX + 1
        currentY = currentY + 1
        continue
      }
      restReached = true
      markPosition(currentX, currentY)
    }
    abyssReached = !restReached
  }

  console.log(minXCoordinate, maxXCoordinate, minYCoordinate, maxYCoordinate)
  console.log(sandIndex)

  const testString = Array.from({length: maxXCoordinate - minXCoordinate}).map((_, i) => (
    Array.from({length: maxYCoordinate - minYCoordinate}).map((__, j) => (blockDict[i + minXCoordinate] && blockDict[i + minXCoordinate][j + minYCoordinate]) ? '#' : '.').join('')
  )).join('\n')
  fs.writeFileSync('test.txt', testString)
}

main();
