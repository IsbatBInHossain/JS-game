const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 1000)

const numberOfEnemy = 10
const enemyArray = []
let gameSpeed = 0

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = '../assets/3_Movement/enemy4.png'
    this.spriteWidth = 213
    this.spriteHeight = 212
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.newX = Math.random() * (CANVAS_WIDTH - this.width)
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
    this.speed = Math.random() * 4 + 1
    this.xSpeed = Math.random() * 50 + 50
    this.ySpeed = Math.random() * 50 + 50
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 2)
    this.interval = Math.floor(Math.random() * 50 + 100)
  }
  update() {
    if (gameSpeed % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width)
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
    }
    let dx = this.x - this.newX
    let dy = this.y - this.newY

    this.x -= dx / this.xSpeed
    this.y -= dy / this.ySpeed
    if (this.x + this.width < 0) this.x = canvas.width
    if (gameSpeed % this.flapSpeed == 0) {
      this.frame > 7 ? (this.frame = 0) : this.frame++
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
