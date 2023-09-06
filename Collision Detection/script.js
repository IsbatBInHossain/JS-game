const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 500
canvas.height = 500
ctx.fillStyle = 'white'

const explosions = []

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * 0.3
    this.height = this.spriteHeight * 0.3
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = '../assets/4_collision/boom.png'
    this.frame = 0
    this.timer = 0
    this.animationSpeed = 7
    this.angle = Math.random() * 6.2
  }

  update() {
    this.timer++
    if (this.timer % this.animationSpeed == 0) {
      this.frame++
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.restore()
  }
}

// window.addEventListener('mousemove', function (e) {
//   createExplosion(e)
// })

window.addEventListener('click', function (e) {
  createExplosion(e)
})

const createExplosion = e => {
  let canvasPosition = canvas.getBoundingClientRect()
  let posX = e.x - canvasPosition.left
  let posY = e.y - canvasPosition.top
  explosions.push(new Explosion(posX, posY))
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }
  requestAnimationFrame(animate)
}

animate()
