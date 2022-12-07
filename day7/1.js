const fs = require('fs');

const CD_COMMAND = '$ cd'
const LS_COMMAND = '$ ls'
const GO_BACK_PATH = '..'
const PATH_SEPARATOR = '/'
const SIZE_LIMIT = 100000

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

  let sizeAccumulator = 0

  const dirSize = (node) => {
    if (node && typeof node === 'object') {
      const size = Object.values(node).reduce((acc, v) => acc + dirSize(v), 0)
      if (size <= 100000) {
        sizeAccumulator += size
      }
      return size
    } else {
      return node
    }
  }

  dirSize(fileSystem)

  console.log(sizeAccumulator)
}

main();
