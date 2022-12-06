const fs = require('fs');

const MARKER_LENGTH = 14

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8');

  for (let i = MARKER_LENGTH - 1; i < data.length; i += 1) {
    const charactersRepeated = data.slice(i - MARKER_LENGTH + 1, i + 1).split('').sort().some((c, index, list) => {
      if (index === 0) {
        return false
      }
      return c === list[index - 1]
    })

    if (!charactersRepeated) {
      console.log(data.slice(i - MARKER_LENGTH + 1, i + 1))
      console.log(i + 1)
      break
    }
  }
}

main();
