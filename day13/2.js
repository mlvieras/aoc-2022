const fs = require('fs');

const DIVIDER_PACKET_1 = '[[2]]'
const DIVIDER_PACKET_2 = '[[6]]'

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n\n')
    .map(d => d.split('\n').filter(Boolean).map(v => JSON.parse(v)))
    .reduce((list, pair) => [...list, ...pair])

  data.push(JSON.parse(DIVIDER_PACKET_1))
  data.push(JSON.parse(DIVIDER_PACKET_2))

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

  data.sort((a,b) => packetsAreSorted(a,b) ? -1 : 1)

  const divider1Index = data.findIndex((p) => JSON.stringify(p) === DIVIDER_PACKET_1) + 1
  const divider2Index = data.findIndex((p) => JSON.stringify(p) === DIVIDER_PACKET_2) + 1

  console.log(divider1Index, divider2Index, divider1Index * divider2Index)
}

main();
