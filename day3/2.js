const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8');

  const sumOfPriorities = data.split('\n').slice(0, -1).map((l, index, list) => {
    if (index % 3 === 0) {
      return list.slice(index, index + 3)
    }
  }).filter(Boolean).reduce((acc, group) => {
    const badgeCharacter = group[0].split('').find(c1 => (
      group[1].includes(c1) && group[2].includes(c1)
    ))
    const charCode = badgeCharacter.charCodeAt()
    // The character is 'a' or bigger
    if (charCode >= 97) {
      return acc + charCode - 96
    } else {
      return acc + charCode - 64 + 26
    }
  },0)

  console.log(sumOfPriorities)
}

main();
