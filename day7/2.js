const fs = require('fs');

const TOTAL_SIZE = 70000000
const TARGET_SIZE = 30000000

const CD_COMMAND = '$ cd'
const LS_COMMAND = '$ ls'
const GO_BACK_PATH = '..'
const PATH_SEPARATOR = '/'

const main = async () => {
  const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').slice(0, -1);

  const fileSystem = {}

  let currentPath = []
  let currentPWD = fileSystem

  data.forEach(r => {
    if (r.startsWith(CD_COMMAND)) {
      const path = r.split(' ')[2]
      if (path === GO_BACK_PATH) {
        currentPath = currentPath.slice(0, -1)
        currentPWD = currentPath.reduce((dir, p) => dir[p], fileSystem)
      } else if (path !== PATH_SEPARATOR) {
        currentPWD = currentPWD[path] = currentPWD[path] || {}
        currentPath.push(path)
      }
    } else if (!r.startsWith(LS_COMMAND) && !r.startsWith('dir')) {
      const [fileSize, fileName] = r.split(' ')
      currentPWD[fileName] = parseInt(fileSize, 10)
    }
  })

  const sizeList = []

  const dirSize = (node) => {
    if (node && typeof node === 'object') {
      const size = Object.values(node).reduce((acc, v) => acc + dirSize(v), 0)
      node.__size = size
      sizeList.push(size)
      return size
    } else {
      return node
    }
  }

  const rootSize = dirSize(fileSystem)
  const sizeToFree = TARGET_SIZE - (TOTAL_SIZE - rootSize)

  let candidateSize = Infinity

  sizeList.forEach((s) => {
    if (s >= sizeToFree && s < candidateSize) {
      candidateSize = s
    }
  })

  console.log(sizeToFree, candidateSize)
}

main();
