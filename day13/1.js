const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n\n')
    .map(d => d.split('\n').filter(Boolean).map(v => JSON.parse(v)))

  const packetsAreSorted = (p1, p2) => {
    if (typeof p1 === 'number' && typeof p2 === 'number') {
      if (p1 === p2) {
        return undefined
      }
      return p1 < p2
    }
    let aP1 = Array.isArray(p1) ? p1 : [p1]
    let aP2 = Array.isArray(p2) ? p2 : [p2]
    if (!aP1.length && !aP2.length) {
      return undefined
    }
    const result = aP1.reduce((acc, v1, i) => {
      if (acc !== undefined) {
        return acc
      }
      const v2 = aP2[i]
      if (v2 === undefined) {
        return false
      }
      const sorted = packetsAreSorted(v1, v2)
      return sorted
    }, undefined)
    return result === undefined ? true : result
  }

  const sumOfIndices = data.reduce((sum, [firstPacket, secondPacket], index) => {
    const sorted = packetsAreSorted(firstPacket, secondPacket)
    return sorted ? sum + index + 1 : sum
  }, 0)

  console.log(sumOfIndices)
}

main();
