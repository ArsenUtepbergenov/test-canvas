import Keyboard from './KeyboardState.js'

export function setupKeyboard(entity) {
  const input = new Keyboard()

  input.addMapping('Space', keyState => (keyState ? entity.jump.start() : entity.jump.cancel()))
  input.addMapping('ArrowRight', keyState => (entity.go.direction = keyState))
  input.addMapping('ArrowLeft', keyState => (entity.go.direction = -keyState))

  return input
}
