import Compositor from './Compositor.js'
import TileCollider from './TileCollider.js'

export default class Level {
  constructor() {
    this.gravity = 1500
    this.totalTime = 0
    this.comp = new Compositor()
    this.entities = new Set()

    this.tileCollider = null
  }

  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix)
  }

  update(dTime) {
    this.entities.forEach(entity => {
      entity.update(dTime)

      entity.pos.x += entity.vel.x * dTime
      this.tileCollider.checkX(entity)

      entity.pos.y += entity.vel.y * dTime
      this.tileCollider.checkY(entity)

      entity.vel.y += this.gravity * dTime
    })

    this.totalTime += dTime
  }
}
