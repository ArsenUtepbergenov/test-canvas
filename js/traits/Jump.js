import Trait from './Trait.js'
import { Sides } from '../Entity.js'

export default class Jump extends Trait {
  constructor() {
    super('jump')

    this.ready = 0
    this.duration = 0.3
    this.velocity = 200
    this.requestTime = 0
    this.gracePeriod = 0.1
    this.speedBoost = 0.3
    this.engageTime = 0
  }

  get falling() {
    return this.ready < 0
  }

  start() {
    this.requestTime = this.gracePeriod
  }

  cancel() {
    this.engageTime = 0
    this.requestTime = 0
  }

  obstruct(entity, side) {
    if (side === Sides.BOTTOM) this.ready = 1
    else if (side === Sides.TOP) this.cancel()
  }

  update(entity, dTime) {
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        this.engageTime = this.duration
        this.requestTime = 0
      }

      this.requestTime -= dTime
    }

    if (this.engageTime > 0) {
      entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost)
      this.engageTime -= dTime
    }

    this.ready--
  }
}
