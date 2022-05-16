import Trait from './Trait.js'

export default class Go extends Trait {
  constructor() {
    super('go')

    this.direction = 0
    this.speed = 6000
  }

  update(entity, dTime) {
    entity.vel.x = this.speed * this.direction * dTime
  }
}