const fs = require('fs');

const STEPS = {
  UP: 'U',
  DOWN: 'D',
  RIGHT: 'R',
  LEFT: 'L'
}

const ROPE_LENGTH = 10

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(' '))

  const visitedPositions = {
    '0|0': true
  }

  let knotPositions = Array.from({length: ROPE_LENGTH}).map(() => ({
    x: 0,
    y: 0
  }))
  data.forEach(([direction, steps]) => {
    const stepNumber = parseInt(steps, 10)

    for (let i = 0; i < stepNumber; i++) {
      const headKnot = knotPositions[0]
      if (direction === STEPS.UP) {
        headKnot.y = headKnot.y + 1
      } else if (direction === STEPS.DOWN) {
        headKnot.y = headKnot.y - 1
      } else if (direction === STEPS.LEFT) {
        headKnot.x = headKnot.x - 1
      } else if (direction === STEPS.RIGHT) {
        headKnot.x = headKnot.x + 1
      }
      for (let j = 1; j < ROPE_LENGTH; j++) {
        const previousKnot = knotPositions[j - 1]
        const currentKnot = knotPositions[j]
        const offsetX = previousKnot.x - currentKnot.x
        const offsetY = previousKnot.y - currentKnot.y
        if (Math.abs(offsetX) <= 1 && Math.abs(offsetY) <= 1) {
          // The head is adjacent to the tail, no need to move
          continue
        }
        if (Math.abs(offsetX) === 2 && Math.abs(offsetY) === 1) {
          currentKnot.x = currentKnot.x + offsetX - Math.sign(offsetX)
          currentKnot.y = currentKnot.y + offsetY
        } else if (Math.abs(offsetY) === 2 && Math.abs(offsetX) === 1) {
          currentKnot.y = currentKnot.y + offsetY - Math.sign(offsetY)
          currentKnot.x = currentKnot.x + offsetX
        } else {
          currentKnot.x = currentKnot.x + offsetX - Math.sign(offsetX)
          currentKnot.y = currentKnot.y + offsetY - Math.sign(offsetY)
        }
        if (j === ROPE_LENGTH - 1) {
          visitedPositions[`${currentKnot.x}|${currentKnot.y}`] = true
        }
      }
    }
  })

  console.log(visitedPositions)
  console.log(Object.keys(visitedPositions).length)
}

main();
