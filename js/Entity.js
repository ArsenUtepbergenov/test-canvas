import { Vec2 } from './math.js'

export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0)
    this.vel = new Vec2(0, 0)
    this.size = new Vec2(0, 0)

    this.traits = []
  }

  update(dTime) {
    this.traits.forEach(trait => {
      trait.update(this, dTime)
    })
  }

  addTrait(trait) {
    this.traits.push(trait)
    this[trait.NAME] = trait
  }
}