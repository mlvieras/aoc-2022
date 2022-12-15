const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split('').map(c => parseInt(c, 10)));

  const markedTrees = {}

  data.forEach((r, i) => {
    let currentHeight = -1
    r.forEach((t, j) => {
      if (t > currentHeight) {
        currentHeight = t
        markedTrees[`${i}-${j}`] = t
      }
    });
    currentHeight = -1;
    [...r].reverse().forEach((t, j, list) => {
      if (t > currentHeight) {
        currentHeight = t
        markedTrees[`${i}-${list.length - j - 1}`] = t
      }
    })
  })

  Array.from({length: data[0].length}).forEach((_, j) => {
    let currentHeight = -1
    let backwardsCurrentHeight = -1
    Array.from({length: data.length}).forEach((_, i) => {
      const t = data[i][j]
      if (t > currentHeight) {
        currentHeight = t
        markedTrees[`${i}-${j}`] = t
      }
      const backwardsIndex = data.length - i - 1
      const bt = data[backwardsIndex][j]
      if (bt > backwardsCurrentHeight) {
        backwardsCurrentHeight = bt
        markedTrees[`${backwardsIndex}-${j}`] = bt
      }
    })
  })

  console.log(JSON.stringify(Object.keys(markedTrees)))
  console.log(data.reduce((acc, r) => acc + r.length, 0))
  console.log(Object.keys(markedTrees).length)
}

main();
