import * as PIXI from 'pixi.js';
import './index.css';

const app = new PIXI.Application({
  width: 640,
  height: 480,
  backgroundColor: 0xe3e3e3,
  // antialias: true,
});

const shapes = [];
let gravity = 1;
const root = document.getElementById('root');
root.appendChild(app.view);
app.view.addEventListener('pointerdown', (e) => {
  generateRect(e.offsetX, e.offsetY);
  console.log('[x, y]', e.offsetX, e.offsetY);
});

app.ticker.add(() => {
  // iterate through the dudes and update their position
  shapes.forEach((shape, index) => {
    // shape.y += gravity;
    if (shape.y > 700) {
      shapes.splice(index, 1);
      console.log('y', shape.y);
      console.log('total length', shapes.length);
    }
  });
});


function generateRect(x = 50, y = -50) {
  console.log('generateRect', x, y)
  const rect = new PIXI.Graphics();
  const bg = Math.floor(Math.random() * 0xffffff);
  const stroke = Math.floor(Math.random() * 0xffffff);
  rect.lineStyle(2, stroke, 1);
  rect.beginFill(bg);
  rect.drawRect(x, y, 100, 100);
  // rect.drawRect(
  //   Math.floor(Math.random() * 600),
  //   Math.floor(Math.random() * Math.random() * (-800)),
  //   Math.floor(Math.random() * 100),
  //   Math.floor(Math.random() * 100)
  // );
  console.log('rect', rect);
  
  rect.interactive = true;
  rect.buttonMode = true;
  rect.endFill();
  shapes.push(rect);
  app.stage.addChild(rect);
}