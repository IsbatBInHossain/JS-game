const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 1000)

const numberOfEnemy = 500
const enemyArray = []
let gameSpeed = 0

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = '../assets/3_Movement/enemy3.png'
    this.spriteWidth = 218
    this.spriteHeight = 177
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.speed = Math.random() * 4 + 1
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.angle = 0
    this.angleSpeed = Math.random() * 2 + 1
    this.amplitude = Math.random() * 100 + (canvas.width - this.width) / 2 - 100
  }
  update() {
    this.x =
      ((canvas.width - this.width) / 2) *
        Math.sin((this.angle * Math.PI) / 90) +
      canvas.width / 2 -
      this.width / 2
    this.y =
      ((canvas.height - this.height) / 2) *
        Math.cos((this.angle * Math.PI) / 360) +
      canvas.height / 2 -
      this.height / 2

    if (this.angle > 10000) this.angle = this.angle - 9720
    else this.angle += this.angleSpeed

    // this.angle += this.angleSpeed

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
