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
    const [theirPlay, myPlay] = row.split(' ')
    const myNumericPlay = myPlayMap[myPlay]
    const theirNumericPlay = theirPlayMap[theirPlay]

    let handScore = 0
    if (theirNumericPlay === winMap[myNumericPlay]) {
      handScore = 6
    } else if (theirNumericPlay === myNumericPlay) {
      handScore = 3
    } else {
      handScore = 0
    }

    return acc + handScore + myNumericPlay
  }, 0)

  console.log(score)
}

main();
