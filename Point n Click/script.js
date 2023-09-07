const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight
ctx.font = '50px Impact'

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

let score = 0
let gameOver = false

let ravens = []

class Raven {
  constructor() {
    this.spriteWidth = 271
    this.spriteHeight = 194
    this.size = Math.random() * 0.25 + 0.25
    this.width = this.spriteWidth * this.size
    this.height = this.spriteHeight * this.size
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = '../assets/5_point_n_shoot/raven.png'
    this.frame = 0
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 100 + 20
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ]
    this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`
    this.hasTrail = Math.random() > 0.5
  }

  update(deltaTime) {
    this.timeSinceFlap += deltaTime
    this.x -= this.directionX
    this.y -= this.directionY
    if (this.y < 0 || this.y > canvas.height - this.width) this.directionY *= -1
    if (this.x + this.spriteWidth < 0) this.markedForDeletion = true
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > 4) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
      if (this.hasTrail) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color))
        }
      }
    }
    if (this.x + this.width < 0) gameOver = true
  }

  draw() {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

let explosions = []

class Explosion {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * this.size
    this.height = this.spriteHeight * this.size
    this.image = new Image()
    this.image.src = '../assets/4_collision/boom.png'
    this.audio = new Audio()
    this.audio.src = '../assets/audio/rumble.flac'
    this.frame = 0
    this.timer = 0
    this.nextFrameTime = 200
    this.markedForDeletion = false
  }

  update(deltaTime) {
    if (this.frame == 0) this.audio.play()
    this.timer += deltaTime
    if (this.timer > this.nextFrameTime) {
      this.frame++
      this.timer = 0
      if (this.frame > 5) {
        this.markedForDeletion = true
      }
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

let particles = []

class Particle {
  constructor(x, y, size, color) {
    this.size = size
    this.x = x + this.size / 2 + Math.random() * 50 - 20
    this.y = y + this.size / 3
    this.color = color
    this.radius = Math.random() * (this.size / 10)
    this.maxRadius = Math.random() * 20 + 35
    this.speedX = Math.random() + 0.5
    this.markedForDeletion = false
  }
  update() {
    this.x += this.speedX
    this.radius += 0.3
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = 1 - this.radius / this.maxRadius
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const drawScore = () => {
  ctx.fillStyle = 'black'
  ctx.fillText(`Score: ${score}`, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText(`Score: ${score}`, 55, 80)
}

const drawGameOver = () => {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = 'white'
  ctx.fillText('Game Over', canvas.width / 2 + 5, canvas.height / 2 + 5)
}

window.addEventListener('click', e => {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
  const pc = detectPixelColor.data
  ravens.forEach(raven => {
    if (
      raven.randomColors[0] == pc[0] &&
      raven.randomColors[1] == pc[1] &&
      raven.randomColors[2] == pc[2]
    ) {
      raven.markedForDeletion = true
      score++
      explosions.push(new Explosion(raven.x, raven.y, raven.size))
    }
  })
})

const animate = timestamp => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltaTime
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven())
    timeToNextRaven = 0
    ravens.sort((a, b) => a.width - b.width)
  }
  drawScore()
  ;[...particles, ...ravens, ...explosions].forEach(object => {
    object.update(deltaTime)
    object.draw()
  })
  ravens = ravens.filter(raven => !raven.markedForDeletion)
  explosions = explosions.filter(explosion => !explosion.markedForDeletion)
  particles = particles.filter(particle => !particle.markedForDeletion)

  requestAnimationFrame(animate)
}

animate(0)
