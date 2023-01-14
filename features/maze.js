let columns = 0
let rows = 0
const w = 40
const grid = []
let currentCell = null

const stack = []

function setup() {
  createCanvas(400, 400)
  columns = floor(width / w)
  rows = floor(height / w)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const cell = new Cell(c, r)
      grid.push(cell)
    }
  }

  currentCell = grid[0]
}

function draw() {
  background(51)

  for (const cell of grid) {
    cell.show()
  }

  currentCell.visited = true
  currentCell.highlight()

  const nextCell = currentCell.checkNeighbors()

  if (nextCell) {
    nextCell.visited = true

    stack.push(currentCell)

    removeWalls(currentCell, nextCell)

    currentCell = nextCell
  } else if (stack.length > 0) {
    currentCell = stack.pop()
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > columns - 1 || j > rows - 1) return -1

  return i + j * columns
}

class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true]
    this.visited = false
  }

  highlight() {
    const x = this.i * w
    const y = this.j * w

    noStroke()
    fill(0, 0, 255, 100)
    rect(x, y, w, w)
  }

  checkNeighbors() {
    const neighbors = []

    const top = grid[index(this.i, this.j - 1)]
    const right = grid[index(this.i + 1, this.j)]
    const left = grid[index(this.i - 1, this.j)]
    const bottom = grid[index(this.i, this.j + 1)]

    if (!top?.visited) neighbors.push(top)
    if (!right?.visited) neighbors.push(right)
    if (!left?.visited) neighbors.push(left)
    if (!bottom?.visited) neighbors.push(bottom)

    if (neighbors.length > 0) {
      const r = floor(random(0, neighbors.length))
      return neighbors[r]
    } else {
      return undefined
    }
  }

  show() {
    const x = this.i * w
    const y = this.j * w

    stroke(255)
    if (this.walls[0]) line(x, y, x + w, y)
    if (this.walls[1]) line(x + w, y, x + w, y + w)
    if (this.walls[2]) line(x + w, y + w, x, y + w)
    if (this.walls[3]) line(x, y + w, x, y)

    if (this.visited) {
      noStroke()
      fill(255, 0, 255, 100)
      rect(x, y, w, w)
    }
  }
}

function removeWalls(a, b) {
  const x = a.i - b.i

  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }

  const y = a.j - b.j

  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}
