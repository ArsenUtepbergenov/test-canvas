import Trait from './Trait.js'

export default class Velocity extends Trait {
  constructor() {
    super('velocity')
  }

  update(entity, dTime) {
    entity.pos.x += entity.vel.x * dTime
    entity.pos.y += entity.vel.y * dTime
  }
}
