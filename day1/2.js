const fs = require('fs');

const AMOUNT_OF_ELVES = 3;

const main = async () => {
  const data = await fs.readFileSync('./input.txt', 'utf-8');

  const splitData = data.split('\n\n');

  let mostCalories = []

  splitData.forEach((food) => {
    const totalFood = food.split('\n').reduce((totalCalories, cal) => {
      return totalCalories + Number(cal)
    }, 0)
    if (mostCalories.length < AMOUNT_OF_ELVES) {
      mostCalories.push(totalFood);
      mostCalories = mostCalories.sort();
    } else if (totalFood > mostCalories[AMOUNT_OF_ELVES - 1]) {
      mostCalories.shift();
      mostCalories.push(totalFood);
      mostCalories = mostCalories.sort();
    }
  }, 0)

  const total = mostCalories.reduce((acc, cal) => acc + cal, 0)
  console.log(total)
}

main();
