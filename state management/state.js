export const states = {
  STANDING_RIGHT: 0,
  STANDING_LEFT: 1,
  SITTING_RIGHT: 2,
  SITTING_LEFT: 3,
  RUNNING_RIGHT: 4,
  RUNNING_LEFT: 5,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super('STANDING_LEFT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.STANDING_RIGHT);
    else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
    else if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
  }
}
export class StandingRight extends State {
  constructor(player) {
    super('STANDING_RIGHT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.STANDING_LEFT);
    else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
    else if (input === 'PRESS right')
      this.player.setState(states.RUNNING_RIGHT);
  }
}
export class SittingRight extends State {
  constructor(player) {
    super('SITTING_RIGHT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 8;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS up') this.player.setState(states.STANDING_RIGHT);
    else if (input === 'PRESS left') this.player.setState(states.SITTING_LEFT);
    else if (input === 'RELEASE down')
      this.player.setState(states.STANDING_RIGHT);
  }
}
export class SittingLeft extends State {
  constructor(player) {
    super('SITTING_LEFT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 9;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS up') this.player.setState(states.STANDING_LEFT);
    else if (input === 'PRESS right')
      this.player.setState(states.SITTING_RIGHT);
    else if (input === 'RELEASE down')
      this.player.setState(states.STANDING_LEFT);
  }
}
export class RunningRight extends State {
  constructor(player) {
    super('RUNNING_RIGHT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
    else if (input === 'RELEASE right')
      this.player.setState(states.STANDING_RIGHT);
    else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
  }
}
export class RunningLeft extends State {
  constructor(player) {
    super('RUNNING_LEFT');
    this.player = player;
  }
  enter() {
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
    else if (input === 'RELEASE left')
      this.player.setState(states.STANDING_LEFT);
    else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
  }
}
