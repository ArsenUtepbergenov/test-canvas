import Timer from './js/Timer.js'
import Camera from './js/Camera.js'
import { loadLevel } from './js/loaders.js'
import { createMario } from './js/entities.js'
import { createCollisionLayer, createCameraLayer } from './js/layers.js'
import { setupKeyboard } from './js/input.js'
import { setupMouseControl } from './js/debug.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  const camera = new Camera()
  window.camera = camera

  mario.pos.set(64, 64)

  // level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera))
  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  setupMouseControl(canvas, mario, camera)

  const timer = new Timer(1 / 60)
  timer.update = function update(dTime) {
    level.update(dTime)
    level.comp.draw(context, camera)
  }

  timer.start()
})
