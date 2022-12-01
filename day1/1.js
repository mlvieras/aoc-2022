const fs = require('fs');

const main = async () => {
  const data = await fs.readFileSync('./input.txt', 'utf-8');

  const splitData = data.split('\n\n');

  const biggestCalories = splitData.reduce((acc, food) => {
    const totalFood = food.split('\n').reduce((totalCalories, cal) => {
      return totalCalories + Number(cal)
    }, 0)
    return totalFood > acc ? totalFood : acc
  }, 0)

  console.log(biggestCalories)
}

main();
