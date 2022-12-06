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

    Array.from({length: amount}).forEach(() => {
      const object = crates[origin - 1].pop()
      crates[destination - 1].push(object)
    })
  })

  const topMostObjects = crates.map(c => c[c.length - 1])

  console.log(topMostObjects.join(''))
}

main();
