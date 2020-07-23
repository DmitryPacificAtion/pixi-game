import * as PIXI from 'pixi.js';
import './index.css';
import * as CAT from './assets/cat.png';
import * as KIDS_TILESET from './assets/09.png';
import * as KIRBY from './assets/kirby.png';

let TextureCache = PIXI.utils.TextureCache,
  Application = PIXI.Application,
  loader = new PIXI.Loader(),
  resources = loader.resources,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight - 20,
  backgroundColor: 0x749ad4,
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

let rocket, state;

function setupTile() {
  const texture = TextureCache[KIDS_TILESET]; // Use resources.cat.texture
  const rectangle = new Rectangle(96, 64, 32, 32);
  texture.frame = rectangle;
  rocket = new Sprite(texture);
  rocket.x = 64;
  rocket.y = 64;
  rocket.vx = 0;
  rocket.vy = 0;
  app.stage.addChild(rocket);

  //Capture the keyboard arrow keys
  let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");
  
  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    rocket.vx = -5;
    rocket.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && rocket.vy === 0) {
      rocket.vx = 0;
    }
  };

  //Up
  up.press = () => {
    rocket.vy = -5;
    rocket.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && rocket.vx === 0) {
      rocket.vy = 0;
    }
  };

  //Right
  right.press = () => {
    rocket.vx = 5;
    rocket.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && rocket.vy === 0) {
      rocket.vx = 0;
    }
  };

  //Down
  down.press = () => {
    rocket.vy = 5;
    rocket.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && rocket.vx === 0) {
      rocket.vy = 0;
    }
  };

  state = play;
  app.renderer.render(app.stage);
  app.ticker.add(delta => gameLoop(delta));
}

function keyboard(value) {
  const key = {
    value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler: (e) => {
      if (e.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        e.preventDefault();
      }
    },
    upHandler: (e) => {
      if (e.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        e.preventDefault();
      }
    },
    unsubscribe: () => {
      window.removeEventListener("keydown", key.downHandler);
      window.removeEventListener("keyup", key.upHandler);
    }
  };

  window.addEventListener(
    "keydown", key.downHandler, false
  );
  window.addEventListener(
    "keyup", key.upHandler, false
  );
  return key;
}
function gameLoop(delta) {
  state(delta);
}
function play(delta) {
  rocket.x += rocket.vx;
  rocket.y += rocket.vy
}
// function moveRight(delta, item) {
//   item.x += 1 + delta;
// }
// function moveLeft(delta, item) {
//   item.x -= 1 + delta;
// }
// function moveUp(delta, item) {
//   item.y += 1 + delta;
// }
// function moveDown(delta, item) {
//   item.y -= 1 + delta;
// }
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