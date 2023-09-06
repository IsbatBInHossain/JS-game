const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 1000)

const numberOfEnemy = 200
const enemyArray = []
let gameSpeed = 0

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = '../assets/3_Movement/enemy2.png'
    this.spriteWidth = 266
    this.spriteHeight = 188
    this.frame = 0
    this.speed = Math.random() * 4 + 1
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.flapSpeed = Math.floor(Math.random() * 5 + 3)
    this.angle = 0
    this.amplitude = Math.random() * 7
  }
  update() {
    this.x -= this.speed
    this.y += this.amplitude * Math.sin(this.angle)

    if (this.angle > 1000) this.angle = 0
    else this.angle = this.angle + Math.random() * 0.1

    if (this.x + this.width < 0) this.x = canvas.width
    if (gameSpeed % this.flapSpeed == 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
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

for (let i = 0; i < numberOfEnemy; i++) {
  enemyArray.push(new Enemy())
}

const enemy = new Enemy()

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  enemyArray.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })
  gameSpeed++
  requestAnimationFrame(animate)
}

animate()
