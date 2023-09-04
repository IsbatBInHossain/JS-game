const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

const backgroundLayer1 = new Image()
const backgroundLayer2 = new Image()
const backgroundLayer3 = new Image()
const backgroundLayer4 = new Image()
const backgroundLayer5 = new Image()

backgroundLayer1.src = '../assets/2_Parallax/layer-1.png'
backgroundLayer2.src = '../assets/2_Parallax/layer-2.png'
backgroundLayer3.src = '../assets/2_Parallax/layer-3.png'
backgroundLayer4.src = '../assets/2_Parallax/layer-4.png'
backgroundLayer5.src = '../assets/2_Parallax/layer-5.png'

window.addEventListener('load', () => {
  const slider = document.getElementById('slider')
  const showGameSpeed = document.getElementById('gameSpeed')

  let gameSpeed = 6
  slider.value = gameSpeed
  showGameSpeed.innerHTML = gameSpeed

  slider.addEventListener('change', e => {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = e.target.value
  })

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 700
      this.image = image
      this.speedModifier = speedModifier
      this.speed = gameSpeed * this.speedModifier
    }
    update() {
      this.speed = gameSpeed * this.speedModifier
      if (this.x < -this.width) {
        this.x = this.x + this.width - this.speed
      } else {
        this.x -= this.speed
      }
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      )
    }
  }

  const layer1 = new Layer(backgroundLayer1, 0.3)
  const layer2 = new Layer(backgroundLayer2, 0.5)
  const layer3 = new Layer(backgroundLayer3, 0.6)
  const layer4 = new Layer(backgroundLayer4, 0.8)
  const layer5 = new Layer(backgroundLayer5, 1)

  const layers = [layer1, layer2, layer3, layer4, layer5]

  const drawAndUpdate = layers => {
    layers.forEach(layer => {
      layer.update()
      layer.draw()
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    drawAndUpdate(layers)
    requestAnimationFrame(animate)
  }

  animate()
})
