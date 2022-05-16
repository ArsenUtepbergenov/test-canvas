export default class Times {
  constructor(dTime = 1 / 60) {
    let accumulatedTime = 0
    let lastTime = 0

    this.updateProxy = time => {
      accumulatedTime += (time - lastTime) / 1000

      if (accumulatedTime > 1) accumulatedTime = 1

      while (accumulatedTime > dTime) {
        this.update(dTime)
        accumulatedTime -= dTime
      }

      lastTime = time

      this.enqueue()
    }
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy)
  }

  start() {
    this.enqueue()
  }
}
