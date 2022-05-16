import Trait from './Trait.js'

export default class Go extends Trait {
  constructor() {
    super('go')

    this.direction = 0
    this.speed = 6000

    this.distance = 0
    this.heading = 1
  }

  update(entity, dTime) {
    entity.vel.x = this.speed * this.direction * dTime

    if (this.direction) {
      this.heading = this.direction
      this.distance += Math.abs(entity.vel.x) * dTime
    } else {
      this.direction = 0
    }
  }
}
