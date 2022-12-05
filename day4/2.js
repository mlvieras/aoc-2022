const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8');

  const overlappedAmount = data.split('\n').slice(0, -1).reduce((acc, row) => {
    const [firstRange, secondRange] = row.split(',')
      .map(r => r.split('-').map(n => parseInt(n, 10)))
      .sort((a, b) => a[0] - b[0])

    if (secondRange[0] <= firstRange[1]) {
      return acc + 1
    }
    return acc
  }, 0)

  console.log(overlappedAmount)
}

main();
