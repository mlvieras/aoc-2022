const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8');

  const sumOfPriorities = data.split('\n').slice(0, -1).reduce((acc, line) => {
    const characters = line.split('')
    const firstCompartment = characters.slice(0, characters.length / 2)
    const secondCompartment = characters.slice(characters.length / 2)
    const repeatedCharacter = firstCompartment.find((c1) => secondCompartment.join('').includes(c1))
    const charCode = repeatedCharacter.charCodeAt()
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
