const fs = require('fs');

const OPERATORS = {
  MULTIPLICATION: '*',
  SUM: '+',
  SUBSTRACTION: '-',
  DIVISION: '/'
}

const OLD_VALUE = 'old'

const ROUNDS = 10000

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

  const tests = monkeys.map(m => m.test)
  monkeys.forEach((m) => {
    m.items = m.items.map(item => tests.map(t => item % t))
  })

  for (let round = 0; round < ROUNDS; round++) {
    monkeys.forEach((monkey, id) => {
      for (let item = 0; item < monkey.items.length; item++) {
        const itemValues = monkey.items[item].map((worry, monkeyId) => {
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
          return transformedWorry % monkeys[monkeyId].test
        })
        if (itemValues[id] === 0) {
          monkeys[monkey.trueCondition].items.push(itemValues)
        } else {
          monkeys[monkey.falseCondition].items.push(itemValues)
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
