const fs = require('fs');

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(r => r.split('').map(c => parseInt(c, 10)));

  const markedTrees = {}

  // Tracker is an object where the keys correspond to the tree size
  // and the values correspond to the last seen position where a tree of
  // that size is.
  const getTreeScore = (tracker, t, pos) => {
    const scoreFromData = Object.entries(tracker).reduce((acc, [treeSize, lastPosition]) => {
      // console.log(t, parseInt(treeSize, 10), pos, lastPosition, parseInt(treeSize, 10) >= t, pos - lastPosition, acc)
      return (parseInt(treeSize, 10) >= t && pos - lastPosition < acc) ? pos - lastPosition : acc
    }, pos)
    return scoreFromData
  }

  data.forEach((r, i) => {
    let treeTracker = {}
    r.forEach((t, j) => {
      const score = getTreeScore(treeTracker, t, j)
      markedTrees[`${i}-${j}-${t}`] = [score, 0, 0, 0]
      treeTracker[t] = j
    });
    treeTracker = {};
    [...r].reverse().forEach((t, j, list) => {
      const score = getTreeScore(treeTracker, t, j)
      markedTrees[`${i}-${list.length - j - 1}-${t}`][1] = score
      treeTracker[t] = j
    })
  })

  Array.from({length: data[0].length}).forEach((_, j) => {
    let treeTracker = {}
    let bTreeTracker = {}
    Array.from({length: data.length}).forEach((_, i) => {
      const t = data[i][j]
      const score = getTreeScore(treeTracker, t, i)
      markedTrees[`${i}-${j}-${t}`][2] = score
      treeTracker[t] = i

      const backwardsIndex = data.length - i - 1
      const bt = data[backwardsIndex][j]
      const bScore = getTreeScore(bTreeTracker, bt, i)
      markedTrees[`${backwardsIndex}-${j}-${bt}`][3] = bScore
      bTreeTracker[bt] = i
    })
  })

  console.log(JSON.stringify(Math.max(...Object.values(markedTrees).map(t => t.reduce((acc, v) => acc * v, 1)))))
}

main();
