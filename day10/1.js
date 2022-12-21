const fs = require('fs');

const CYCLES = 5
const CYCLE_OFFSET = 20
const CYCLE_STEP = 40

const COMMANDS = {
  NOOP: 'noop',
  ADDX: 'addx'
}

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(' '))

  let currentCycle = 1
  let registerValue = 1
  const cycleData = {}
  for (let i = 0; i <= CYCLES; i++) {
    const index = i * CYCLE_STEP + CYCLE_OFFSET
    cycleData[index] = 0
  }
  data.forEach(([command, parameter]) => {
    const cycleOffset = command === COMMANDS.ADDX ? 2 : 1
    const coveredCycles = Array.from({length: cycleOffset}).map((_, i) => currentCycle + i)
    coveredCycles.forEach((cycle) => {
      if (cycle in cycleData) {
        cycleData[cycle] = cycle * registerValue
      }
    })

    if (command === COMMANDS.ADDX) {
      registerValue = registerValue + parseInt(parameter, 10)
    }
    currentCycle = currentCycle + cycleOffset
  })

  console.log(cycleData)
  console.log(Object.values(cycleData).reduce((acc, v) => acc + v))
}

main();
