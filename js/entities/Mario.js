import Entity from '../Entity.js'
import Jump from '../traits/Jump.js'
import Go from '../traits/Go.js'
import { loadSpriteSheet } from '../loaders.js'

const SLOW_DRAG = 1 / 1000
const TURBO_DRAG = 1 / 5000

export function loadMario() {
  return loadSpriteSheet('mario').then(createMarioFactory)
}

function createMarioFactory(sprite) {
  const runAnimation = sprite.animations.get('run')

  function routeFrame(mario) {
    if (mario.jump.falling) {
      return 'jump'
    }
    if (mario.go.distance > 0) {
      if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
        return 'break'
      }
      return runAnimation(mario.go.distance)
    }
    return 'idle'
  }

  function setTurboState(turboOn) {
    this.go.dragFactor = turboOn ? TURBO_DRAG : SLOW_DRAG
  }

  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0)
  }

  return function createMario() {
    const mario = new Entity()
    mario.size.set(14, 16)

    mario.addTrait(new Go())
    mario.addTrait(new Jump())

    mario.turbo = setTurboState
    mario.draw = drawMario

    mario.turbo(false)

    return mario
  }
}
