import * as PIXI from 'pixi.js';
import './index.css';
import * as CAT from './assets/cat.png';
import * as KIDS_TILESET from './assets/09.png';

let TextureCache = PIXI.utils.TextureCache,
  Application = PIXI.Application,
  loader = new PIXI.Loader(),
  resources = loader.resources,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;



const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xe3e3e3,
  antialias: true,
});
// app.renderer.view.style.overflow = 'hidden';

window.addEventListener('resize', () => app.renderer.resize(window.innerWidth, window.innerHeight))
const root = document.getElementById('root');
root.appendChild(app.view);


/* CAT */
// loader.add('cat', CAT).on("progress", (loader, resource) => {
//   console.log('loading:', resource.name, loader.progress + '%');
// }).load(setupCats);

// function setupCats() {
//   const cat = new Sprite(resources.cat.texture); // or resources.cat.texture
//   const kitty = new Sprite(resources.cat.texture); // or resources.cat.texture
//   cat.position.set(150, 150);
//   cat.scale.set(2);
//   cat.anchor.x = 0.5;
//   cat.anchor.y = 0.5;
//   cat.rotation = 0;
  
//   kitty.position.set(350, 150);
//   kitty.scale.set(1.75);
//   kitty.pivot.set(32, 32)
//   kitty.rotation = 0;
//   setInterval(() => {
//     cat.rotation += 0.2;
//     kitty.rotation += 0.2;
//   }, 100);
//   app.stage.addChild(cat);
//   app.stage.addChild(kitty);
// }


loader.add(KIDS_TILESET).load(setupTile);
  
function setupTile() {
  let texture = TextureCache[KIDS_TILESET]; // Use resources.cat.texture
  let rectangle = new Rectangle(96, 64, 32, 32);
  texture.frame = rectangle;
  let rocket = new Sprite(texture);
  rocket.x = 64;
  rocket.y = 64;
  app.stage.addChild(rocket);
  app.renderer.render(app.stage);
  app.ticker.add((delta) => moveLoop(delta, rocket));
  }

function moveLoop(delta, item) {
  item.x += delta;
}
/* 
const shapes = [];
let gravity = 1;
const root = document.getElementById('root');
root.appendChild(app.view);
app.view.addEventListener('pointerdown', (e) => {
  generateRect(e.offsetX, e.offsetY);
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
} */