const fs = require('fs');

const OPERATORS = {
  MULTIPLICATION: '*',
  SUM: '+',
  SUBSTRACTION: '-',
  DIVISION: '/'
}

const OLD_VALUE = 'old'

const ROUNDS = 20

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n\n')

  const monkeys = data.map((info) => {
    const splitInfo = info.split('\n').slice(1)
    const startingItems = splitInfo[0].replace('  Starting items: ', '').split(', ').map(i => parseInt(i, 10))
    const operation = splitInfo[1].replace('  Operation: new = ', '').split(' ')
    const test = parseInt(splitInfo[2].replace('  Test: divisible by ', ''), 10)
    const trueCondition = splitInfo[3].replace('    If true: throw to monkey ', '')
    const falseCondition = splitInfo[4].replace('    If false: throw to monkey ', '')

    const monkey = {
      items: startingItems,
      operation,
      test,
      trueCondition,
      falseCondition,
      inspections: 0
    }
    return monkey
  })

  for (let round = 0; round < ROUNDS; round++) {
    monkeys.forEach(monkey => {
      for (let item = 0; item < monkey.items.length; item++) {
        const worry = monkey.items[item]
        let transformedWorry = null
        const operand1 = monkey.operation[0] === OLD_VALUE ? worry : parseInt(monkey.operation[0], 10)
        const operand2 = monkey.operation[2] === OLD_VALUE ? worry : parseInt(monkey.operation[2], 10)
        const operator = monkey.operation[1]
        if (operator === OPERATORS.SUM) {
          transformedWorry = operand1 + operand2
        } else if (operator === OPERATORS.SUBSTRACTION) {
          transformedWorry = operand1 - operand2
        } else if (operator === OPERATORS.MULTIPLICATION) {
          transformedWorry = operand1 * operand2
        } else {
          transformedWorry = operand1 / operand2
        }
        const downgradedWorry = Math.floor(transformedWorry / 3)
        if (downgradedWorry % monkey.test === 0) {
          monkeys[monkey.trueCondition].items.push(downgradedWorry)
        } else {
          monkeys[monkey.falseCondition].items.push(downgradedWorry)
        }
      }
      monkey.inspections = monkey.inspections + monkey.items.length
      monkey.items = []
    })
  }

  const inspections = monkeys.map(m => m.inspections).sort((a,b) => b - a)
  console.log(inspections)
  console.log(inspections[0] * inspections[1])
}

main();
