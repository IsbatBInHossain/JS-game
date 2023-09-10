document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  const worm = document.getElementById('worm');
  const ghost = document.getElementById('ghost');
  const spider = document.getElementById('spider');

  let lastTime = 0;
  let nextFrameTime = 0;

  class Game {
    constructor(ctx, width, height) {
      this.enemies = [];
      this.width = width;
      this.height = height;
      this.ctx = ctx;
      this.enemyInterval = 500;
      this.enemyTimer = 0;
      this.enemyType = ['ghost', 'worm', 'spider'];
    }

    update(deltaTime) {
      this.enemies = this.enemies.filter(obj => !obj.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy(this);
        this.enemyTimer = 0;
      } else this.enemyTimer += deltaTime;
      this.enemies.forEach(enemy => enemy.update(deltaTime));
    }
    draw() {
      this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }
    #addNewEnemy() {
      const randomEnemy =
        this.enemyType[Math.floor(Math.random() * this.enemyType.length)];

      if (randomEnemy == 'ghost') this.enemies.push(new Ghost(this, ghost));
      else if (randomEnemy == 'spider')
        this.enemies.push(new Spider(this, spider));
      else this.enemies.push(new Worm(this, worm));

      // this.enemies.sort((a, b) => a.y - b.y);
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
      this.frame = 0;
      this.maxFrame = 5;
      this.nextFrameTime = 100;
      this.timer = 0;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      if (this.timer > this.nextFrameTime) {
        if (this.frame < this.maxFrame) this.frame++;
        else this.frame = 0;
        this.timer = 0;
      }
      this.timer += deltaTime;

      if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx) {
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
      );
    }
  }

  class Worm extends Enemy {
    constructor(game, worm) {
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = this.game.width;
      this.y = this.game.height - this.height;
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }
  class Ghost extends Enemy {
    constructor(game, ghost) {
      super(game);
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.6;
      this.image = ghost;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.radius = Math.random() * 2.5;
    }

    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.radius;
      this.angle += 0.03;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game, spider) {
      super(game);
      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.x = this.game.width * Math.random() * 0.6;
      this.y = 0 - this.height;
      this.image = spider;
      this.bungeeDistance = Math.random() * this.game.height * 0.7;
      this.vx = 0;
      this.vy = Math.random() * 1.5 + 0.5;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += this.vy;
      if (this.y > this.bungeeDistance) {
        this.vy *= -1;
      }
      if (this.y < 0 - this.height) {
        super.markedForDeletion = true;
      }
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, 0);
      ctx.lineTo(this.x + this.width / 2, this.y + 10);
      ctx.stroke();
      super.draw(ctx);
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);

  const animate = timestamp => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    nextFrameTime += deltaTime;
    game.draw();
    game.update(deltaTime);

    requestAnimationFrame(animate);
  };

  animate(0);
});
