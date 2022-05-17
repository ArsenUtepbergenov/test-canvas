export default class Trait {
  constructor(name) {
    this.NAME = name
  }

  obstruct(entity, side) {}

  update() {
    console.warn('Unhandled update call in Trait')
  }
}
