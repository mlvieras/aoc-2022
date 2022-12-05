const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8');

  const overlappedAmount = data.split('\n').slice(0, -1).reduce((acc, row) => {
    const [firstRange, secondRange] = row.split(',')
    const splitFirstRange = firstRange.split('-').map(n => parseInt(n, 10))
    const splitSecondRange = secondRange.split('-').map(n => parseInt(n, 10))

    const firstContainsSecond = splitFirstRange[0] <= splitSecondRange[0] && splitFirstRange[1] >= splitSecondRange[1]
    const secondContainsFirst = splitFirstRange[0] >= splitSecondRange[0] && splitFirstRange[1] <= splitSecondRange[1]
    if (firstContainsSecond || secondContainsFirst) {
      return acc + 1
    }
    return acc
  }, 0)

  console.log(overlappedAmount)
}

main();
