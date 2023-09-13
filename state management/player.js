import {
  StandingRight,
  StandingLeft,
  SittingRight,
  SittingLeft,
  RunningRight,
  RunningLeft,
  JumpingRight,
  JumpingLeft,
  FallingRight,
  FallingLeft,
} from './state.js';

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 181.833;
    this.states = [
      new StandingRight(this),
      new StandingLeft(this),
      new SittingRight(this),
      new SittingLeft(this),
      new RunningRight(this),
      new RunningLeft(this),
      new JumpingRight(this),
      new JumpingLeft(this),
      new FallingRight(this),
      new FallingLeft(this),
    ];
    this.currentState = this.states[0];
    this.image = document.getElementById('player');
    this.x = (this.gameWidth - this.width) / 2;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 0.5;
    this.fps = 24;
    this.timer = 0;
    this.frameInterval = 1000 / this.fps;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    //animation
    if (this.timer >= this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.timer = 0;
    } else this.timer += deltaTime;
    // horizontal movement
    this.x += this.speed;
    if (this.x <= 0) this.x = 0;
    if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else this.vy = 0;

    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
