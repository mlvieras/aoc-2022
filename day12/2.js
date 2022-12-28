const fs = require('fs');

const SUMMIT = 'E'.charCodeAt()
const START = 'S'.charCodeAt()

const LOWERST_HEIGHT = 'a'.charCodeAt()

const main = async () => {
  let summitPosition = [0, 0]
  let startPosition = [0, 0]
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map((r, i) => r.split('').map((c, j) => {
      const code = c.charCodeAt()
      if (code === SUMMIT) {
        summitPosition = [i, j]
        return 'z'.charCodeAt()
      } else if (code === START) {
        startPosition = [i, j]
        return LOWERST_HEIGHT
      }
      return code
    }))

  const rowAmount = data.length
  const columnAmount = data[0].length
  const visitedNodes = data.map(r => r.map(() => false))
  const shortestPaths = data.map(r => r.map((v) => v === LOWERST_HEIGHT ? 0 : Infinity))
  shortestPaths[startPosition[0]][startPosition[1]] = 0
  let currentNode = startPosition
  while (currentNode) {
    const [oi, oj] = currentNode
    const currentHeight = data[oi][oj]
    const neighbors = [
      [oi - 1, oj],
      [oi + 1, oj],
      [oi, oj - 1],
      [oi, oj + 1]
    ].filter(([i, j]) => (
      i >= 0 &&
      i < rowAmount &&
      j >= 0 &&
      j < columnAmount &&
      data[i][j] <= currentHeight + 1 &&
      !visitedNodes[i][j]
    ))
    const pathLengthToNeighbor = shortestPaths[oi][oj] + 1
    neighbors.forEach(([i, j]) => {
      if (shortestPaths[i][j] > pathLengthToNeighbor) {
        shortestPaths[i][j] = pathLengthToNeighbor
      }
    })
    visitedNodes[oi][oj] = true
    currentNode = null
    let minDistance = Infinity
    shortestPaths.forEach((r, i) => r.forEach((v, j) => {
      if (v < minDistance && !visitedNodes[i][j]) {
        minDistance = v
        currentNode = [i, j]
      }
    }))
  }

  console.log(shortestPaths[summitPosition[0]][summitPosition[1]])
}

main();
