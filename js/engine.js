const Engine = (function(global) {
  const doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');
  let lastTime;
  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
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
      // checkCollisions();
    }
  }

  function updateEntities(dt) {
    // allEnemies.forEach(function(enemy) {
    //   enemy.update(dt);
    // })
    player.update();
  }

  function render() {
    let rowImages = [
      'images/water-block.png',   // Top row is water
      'images/water-block.png',   // Top row is water
      'images/water-block.png',   // Top row is water
      'images/water-block.png',   // Top row is water
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      ],
      numRows = 6,
      numCols = 5,
      row, col;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    renderEntities();
  }

  function renderEntities() {
    // allEnemies.forEach(function(enemy) {
    //   enemy.render();
    // });
    player.render();
  }

  function reset() {
  }
  Resources.load([
    'images/stone-block.png',   // Row 1 of 3 of stone
    'images/water-block.png',   // Row 1 of 3 of stone
    'images/char-boy.png',   // Row 1 of 3 of stone
    'images/Selector.png',   // Row 1 of 3 of stone
  ]);
  Resources.onReady(init);
  global.ctx = ctx;
})(this);
