import Compositor from './Compositor.js'
import TileCollider from './TileCollider.js'
import { Matrix } from './math.js'

export default class Level {
  constructor() {
    this.gravity = 1500
    this.totalTime = 0
    this.comp = new Compositor()
    this.entities = new Set()
    this.tiles = new Matrix()

    this.tileCollider = new TileCollider(this.tiles)
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
