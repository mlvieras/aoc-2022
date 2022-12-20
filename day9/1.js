const fs = require('fs');

const STEPS = {
  UP: 'U',
  DOWN: 'D',
  RIGHT: 'R',
  LEFT: 'L'
}

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(' '))

  const visitedPositions = {
    '0-0': true
  }

  let headPosition = {
    x: 0,
    y: 0,
  }
  let tailPosition = {
    x: 0,
    y: 0
  }
  data.forEach(([direction, steps]) => {
    const stepNumber = parseInt(steps, 10)

    for (let i = 0; i < stepNumber; i++) {
      if (direction === STEPS.UP) {
        headPosition.y = headPosition.y + 1
      } else if (direction === STEPS.DOWN) {
        headPosition.y = headPosition.y - 1
      } else if (direction === STEPS.LEFT) {
        headPosition.x = headPosition.x - 1
      } else if (direction === STEPS.RIGHT) {
        headPosition.x = headPosition.x + 1
      }
      const offsetX = headPosition.x - tailPosition.x
      const offsetY = headPosition.y - tailPosition.y
      if (Math.abs(offsetX) <= 1 && Math.abs(offsetY) <= 1) {
        // The head is adjacent to the tail, no need to move
        continue
      }
      if (Math.abs(offsetX) === 2) {
        tailPosition.x = tailPosition.x + offsetX - Math.sign(offsetX)
        tailPosition.y = tailPosition.y + offsetY
      }
      if (Math.abs(offsetY) === 2) {
        tailPosition.y = tailPosition.y + offsetY - Math.sign(offsetY)
        tailPosition.x = tailPosition.x + offsetX
      }
      visitedPositions[`${tailPosition.x}-${tailPosition.y}`] = true
    }
  })

  console.log(Object.keys(visitedPositions).length)
}

main();
