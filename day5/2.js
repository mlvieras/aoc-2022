const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').slice(0, -1);

  const breakIndex = data.findIndex(r => !r)
  const crateList = data.slice(0, breakIndex).reverse().slice(1)
  const instructions = data.slice(breakIndex + 1)

  const crates = []

  // Each crate pile is ordered from bottom to top.
  crateList.forEach((r, i) => {
    let j = 1
    while (j < r.length) {
      const char = r[j]
      if (char.charCodeAt() !== 32) {
        const crateIndex = (j - 1) / 4
        crates[crateIndex] = crates[crateIndex] || []
        crates[crateIndex].push(char)
      }
      j += 4
    }
  })

  instructions.forEach(instruction => {
    const [, amount,,origin,,destination] = instruction.split(' ')

    const cratesToMove = crates[origin - 1].slice(crates[origin - 1].length - amount)
    crates[origin - 1] = crates[origin - 1].slice(0, crates[origin - 1].length - amount)
    crates[destination - 1] = [...crates[destination - 1], ...cratesToMove]
  })

  const topMostObjects = crates.map(c => c[c.length - 1])

  console.log(topMostObjects.join(''))
}

main();
