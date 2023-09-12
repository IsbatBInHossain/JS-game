import {
  StandingRight,
  StandingLeft,
  SittingRight,
  SittingLeft,
  RunningRight,
  RunningLeft,
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
    ];
    this.currentState = this.states[0];
    this.image = document.getElementById('player');
    this.x = (this.gameWidth - this.width) / 2;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
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
  update(input) {
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.speed;
    if (this.x <= 0) this.x = 0;
    if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
