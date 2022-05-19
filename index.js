import Timer from './js/Timer.js'
import Camera from './js/Camera.js'
import { createLevelLoader } from './js/loaders/level.js'
import { loadEntities } from './js/entities.js'
import { setupKeyboard } from './js/input.js'

async function main(canvas) {
  const context = canvas.getContext('2d')

  const entityFactory = await loadEntities()
  const loadLevel = createLevelLoader(entityFactory)
  const level = await loadLevel('1-1')

  const camera = new Camera()

  const mario = entityFactory.mario()
  mario.pos.set(64, 64)

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  const timer = new Timer(1 / 60)
  timer.update = function update(dTime) {
    level.update(dTime)

    if (mario.pos.x > 100) camera.pos.x = mario.pos.x - 100

    level.comp.draw(context, camera)
  }

  timer.start()
}

const canvas = document.getElementById('screen')
main(canvas)
