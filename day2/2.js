const fs = require('fs');

const theirPlayMap = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3  // Scissors
}

const myPlayMap = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3  // Scissors
}

const winMap = {
  1: 3,
  2: 1,
  3: 2
}

const main = async () => {
  const data = await fs.readFileSync('./input.txt', 'utf-8');

  const score = data.split('\n').slice(0, -1).reduce((acc, row) => {
    const [theirPlay, gameResult] = row.split(' ')
    const theirNumericPlay = theirPlayMap[theirPlay]
    let myNumericPlay = theirNumericPlay
    let handScore = 3

    if (gameResult === 'X') {
      myNumericPlay = winMap[theirNumericPlay]
      handScore = 0
    } else if (gameResult === 'Z') {
      myNumericPlay = Number(Object.entries(winMap).find(([p1, p2]) => p2 === theirNumericPlay)[0])
      handScore = 6
    }

    return acc + handScore + myNumericPlay
  }, 0)

  console.log(score)
}

main();
