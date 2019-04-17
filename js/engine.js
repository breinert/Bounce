const Engine = (function(global) {
  const doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main() {
    let now = Date.now(),
    dt = (now - lastTime) / 1000.0;
  update(dt);
  render();
  lastTime = now;
  win.requestAnimationFrame(main);
  }

  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    if(!paused) {
      updateEntities(dt);
      checkCollisions();
    }
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    })
    player.update();
  }

  function render() {
    let rowImages = [
      // place image files here
      ],
      numRows = 6,
      numCols = 5,
      row, col;
    ctx.clearReact(0,0,canvas.width,canvas.height)
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  function reset() {
  }
  Resources.load([
    // insert images
  ]);
  Resources.onReady(init);
  global.ctx = ctx;
})(this);
