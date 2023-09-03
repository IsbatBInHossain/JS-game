const canvas = document.getElementById('canvas1')

const controls = document.getElementById('animations')

let playerState = 'idle'
controls.addEventListener('change', e => {
  playerState = e.target.value
})

const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = 'assets/shadow_dog.png'

let gameFrame = 0
let staggeredFrame = 6

const SPRITE_WIDTH = 575
const SPRITE_HEIGHT = 523

const animationStates = [
  {
    name: 'idle',
    frame: 7,
  },
  {
    name: 'jump',
    frame: 7,
  },
  {
    name: 'fall',
    frame: 7,
  },
  {
    name: 'run',
    frame: 9,
  },
  {
    name: 'dizzy',
    frame: 11,
  },
  {
    name: 'sit',
    frame: 5,
  },
  {
    name: 'roll',
    frame: 7,
  },
  {
    name: 'bite',
    frame: 7,
  },
  {
    name: 'ko',
    frame: 12,
  },
  {
    name: 'getHit',
    frame: 4,
  },
]

const spriteAnimation = []

animationStates.forEach((state, index) => {
  let framePosition = {
    loc: [],
  }

  for (let i = 0; i < state.frame; i++) {
    let posX = i * SPRITE_WIDTH
    let posY = index * SPRITE_HEIGHT
    framePosition.loc.push({
      x: posX,
      y: posY,
    })
  }

  spriteAnimation[state.name] = framePosition
})

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  let position =
    Math.floor(gameFrame / staggeredFrame) %
    spriteAnimation[playerState].loc.length
  let frameX = SPRITE_WIDTH * position
  let frameY = spriteAnimation[playerState].loc[position].y

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    0,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
  )

  frameX = SPRITE_WIDTH * position

  gameFrame++
  if (gameFrame > 37) gameFrame = 0

  requestAnimationFrame(animate)
}

animate()
