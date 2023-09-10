window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', e => {
        console.log(e.key);
      });
    }
  }
  class Player {}
  class Background {}
  class Enemy {}

  const inputHandler = new InputHandler();

  const handleEnemies = () => {};
  const displayStatusText = () => {};

  const animate = () => {};
});
