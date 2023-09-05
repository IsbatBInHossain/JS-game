const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 1000)

const numberOfEnemy = 100
const enemyArray = []
let gameSpeed = 0

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = '../assets/3_Movement/enemy1.png'
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.frame = 0
    // this.speed = Math.random() * 4 - 2
    this.width = this.spriteWidth / 3
    this.height = this.spriteHeight / 3
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.flapSpeed = Math.floor(Math.random() * 5 + 3)
  }
  update() {
    this.x += Math.random() * 6 - 3
    this.y += Math.random() * 6 - 3
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
