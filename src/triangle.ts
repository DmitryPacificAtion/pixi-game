// Triangle
const triangle = new PIXI.Graphics();
const a = {
  x: Math.random() * 600,
  y: Math.random() * 300
};
const b = {
  x: Math.random() * 600,
  y: Math.random() * 300
};
const c = {
  x: Math.random() * 600,
  y: Math.random() * 300
};

triangle.lineStyle(2, Math.random() * 0xffffff, 1);
triangle.beginFill(Math.random() * 0xffffff);
triangle.moveTo(a.x, a.y);
triangle.lineTo(a.x, a.y);
triangle.lineTo(b.x, b.y);
triangle.lineTo(c.x, c.y);
triangle.endFill();
// shapes.push(triangle);
// app.stage.addChild(triangle);

triangle.interactive = true;
triangle.buttonMode = true;