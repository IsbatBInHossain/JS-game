const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

const enemy1 = new Image()
const enemy2 = new Image()
const enemy3 = new Image()
const enemy4 = new Image()

enemy1.src = '../assets/3_Movement/enemy1.png'
enemy2.src = '../assets/3_Movement/enemy2.png'
enemy3.src = '../assets/3_Movement/enemy3.png'
enemy4.src = '../assets/3_Movement/enemy4.png'
