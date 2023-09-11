window.addEventListener('load', () => {
  const toggleFS = document.getElementById('fullScreen');
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1400;
  canvas.height = 720;

  let enemies = [];
  let score = 0;
  let gameOver = false;

  class InputHandler {
    constructor() {
      this.keys = [];
      this.touchY = '';
      this.touchThreshold = 40;
      window.addEventListener('keydown', e => {
        if (
          (e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') &&
          this.keys.indexOf(e.key) == -1
        ) {
          this.keys.push(e.key);
        } else if (e.key === 'Enter' && gameOver === true) {
          restartGame();
        }
      });
      window.addEventListener('keyup', e => {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight'
        )
          this.keys.splice(this.keys.indexOf(e.key), 1);
      });
      window.addEventListener('touchstart', e => {
        this.touchY = e.changedTouches[0].pageY;
      });
      window.addEventListener('touchmove', e => {
        const swipeDistance = e.changedTouches[0].pageY - this.touchY;
        if (
          swipeDistance < -this.touchThreshold &&
          this.keys.indexOf('swipe up') === -1
        ) {
          this.keys.push('swipe up');
        } else if (
          swipeDistance > this.touchThreshold &&
          this.keys.indexOf('swipe down') === -1
        ) {
          this.keys.push('swipe down');
          if (gameOver) restartGame();
        }
      });
      window.addEventListener('touchend', e => {
        this.keys.splice(this.keys.indexOf('swipe up'), 1);
        this.keys.splice(this.keys.indexOf('swipe down'), 1);
      });
    }
  }
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 50;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById('player');
      this.frameX = 0;
      this.maxFrame = 8;
      this.timer = 0;
      this.fps = 20;
      this.frameInterval = 1000 / this.fps;
      this.frameY = 0;
      this.vx = 0;
      this.vy = 0;
      this.weight = 1;
    }
    restart() {
      this.x = 50;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.maxFrame = 8;
    }
    update(input, deltaTime, enemies) {
      // collision detection
      enemies.forEach(enemy => {
        const dx = enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2 + 20);

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.width / 3 + enemy.width / 3) {
          gameOver = true;
        }
      });
      // Sprite animation
      if (this.timer >= this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.timer = 0;
      } else this.timer += deltaTime;

      // Inputs
      if (input.keys.indexOf('ArrowRight') > -1) this.vx += 2;
      else if (input.keys.indexOf('ArrowLeft') > -1) this.vx -= 2;
      else if (
        (input.keys.indexOf('ArrowUp') > -1 ||
          input.keys.indexOf('swipe up') > -1) &&
        this.#onGround()
      )
        this.vy -= 30;
      else this.vx = 0;

      // Horizontal movement
      this.x += this.vx;
      if (this.x < 0) this.x = 0;
      if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      // Vertical movement
      this.y += this.vy;
      if (!this.#onGround()) {
        this.vy += this.weight;
        this.frameY = 1;
        this.maxFrame = 6;
      } else {
        this.vy = 0;
        this.frameY = 0;
        this.maxFrame = 8;
      }

      if (this.y < 0) this.y = 0;
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }

    #onGround() {
      return this.y >= this.gameHeight - this.height;
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
  }
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('background');
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 10;
    }
    restart() {
      this.x = 0;
    }
    update() {
      if (this.x < -this.width) {
        this.x = this.x + this.width - this.speed;
      } else {
        this.x -= this.speed;
      }
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }
  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('enemy');
      this.width = 160;
      this.height = 119;
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.timer = 0;
      this.frameInterval = 1000 / this.fps;
      this.x = this.gameWidth - this.width;
      this.y = this.gameHeight - this.height - 20;
      this.speed = Math.random() * 5 + 5;
      this.markedForDeletion = false;
    }
    update(deltaTime) {
      if (this.timer > this.frameInterval) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else this.frameX = 0;
        this.timer = 0;
      } else this.timer += deltaTime;
      this.x -= this.speed;
      if (this.x + this.width < 0) {
        if (!this.markedForDeletion) {
          this.markedForDeletion = true;
          score++;
        }
      }
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  let lastTime = 0;
  let enemyTimer = 0;
  const enemyInterval = 1000;
  let randomInterval = Math.random() * 500;

  const handleEnemies = deltaTime => {
    if (enemyTimer > enemyInterval + randomInterval) {
      enemies = enemies.filter(obj => !obj.markedForDeletion);
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else enemyTimer += deltaTime;
    enemies.forEach(enemy => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
  };
  const displayStatusText = ctx => {
    ctx.textAlign = 'left';
    ctx.font = '40px Helvetica';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 20, 50);
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 23, 53);
    if (gameOver) {
      ctx.font = '60px Helvetica';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';
      ctx.fillText(`Game Over. Press Enter to Restart.`, canvas.width / 2, 200);
      ctx.fillStyle = 'white';
      ctx.fillText(
        `Game Over. Press Enter to Restart.`,
        canvas.width / 2 + 3,
        203
      );
    }
  };

  const restartGame = () => {
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  };

  const toggleFullScreen = () => {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      canvas
        .requestFullscreen()
        .catch(err =>
          alert(`Error, cannot enable fullscreeen mode: ${err.message}`)
        );
    } else {
      document.exitFullscreen();
    }
  };
  toggleFS.addEventListener('click', toggleFullScreen);

  const inputHandler = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  const animate = timestamp => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltatime = timestamp - lastTime;
    lastTime = timestamp;
    background.draw(ctx);
    handleEnemies(deltatime);
    background.update();
    displayStatusText(ctx);
    player.draw(ctx);
    player.update(inputHandler, deltatime, enemies);
    if (!gameOver) requestAnimationFrame(animate);
    else displayStatusText(ctx);
  };

  animate(0);
});
