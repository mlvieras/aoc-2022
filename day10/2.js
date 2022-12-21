const fs = require('fs');

const CRT_WIDTH = 40
const CRT_HEIGHT = 6
const DARK_PIXEL = '.'
const LIGHT_PIXEL = '#'

const COMMANDS = {
  NOOP: 'noop',
  ADDX: 'addx'
}

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split(' '))

  const crtMonitor = Array.from({length: CRT_HEIGHT * CRT_WIDTH}).map(() => DARK_PIXEL)

  let currentCycle = 1
  let registerValue = 1
  data.forEach(([command, parameter]) => {
    const cycleOffset = command === COMMANDS.ADDX ? 2 : 1
    const coveredCycles = Array.from({length: cycleOffset}).map((_, i) => currentCycle + i)
    console.log(registerValue, parameter || ' ', coveredCycles)
    coveredCycles.forEach((cycle) => {
      const adjustedCycle = (cycle - 1) % CRT_WIDTH
      if (adjustedCycle <= registerValue + 1 && adjustedCycle >= registerValue - 1) {
        crtMonitor[cycle - 1] = LIGHT_PIXEL
      } else {
        crtMonitor[cycle - 1] = DARK_PIXEL
      }
    })

    if (command === COMMANDS.ADDX) {
      registerValue = registerValue + parseInt(parameter, 10)
    }
    currentCycle = currentCycle + cycleOffset
  })

  const crtString = crtMonitor.reduce((acc, pixel, index) => {
    let result = acc
    if (index % CRT_WIDTH === 0) {
      result = `${result}\n`
    }
    return `${result}${pixel}`
  })
  console.log(crtString)
}

main();
