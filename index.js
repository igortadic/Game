const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .2;

class Sprite {
   constructor({position, velocity}) {
     this.position = position;
     this.velocity = velocity;
     this.height = 150;
   }

   draw() {
     c.fillStyle = 'red';
     c.fillRect(this.position.x, this.position.y, 50, this.height);
   }

   update() {
     this.draw();
     this.position.x += this.velocity.x;
     this.position.y += this.velocity.y;

     if (this.position.y + this.height + this.velocity.y >= canvas.height) {
       this.velocity.y = 0;
     } else {
       this.velocity.y += gravity;
     }
   }
}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
});


const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  }
});

enemy.draw();

console.log(player);

const keys = {
  a: {
<<<<<<< HEAD
    pressed: false
  },
  d: {
    pressed: false
=======
    pressed: false;
  },
  d: {
    pressed: false;
>>>>>>> e1da9b8f61ab67b59da00c1bd8c7f1df825110bb
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  if (keys.a.pressed) {
    player.velocity.x = - 1;
  } else if (keys.d.pressed) {
    player.velocity.x = 1;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'd':
<<<<<<< HEAD
      keys.d.pressed = true
    break
    case 'a':
      keys.a.pressed = true
=======
      keys.d.pressed = True;
    break
    case 'a':
      keys.a.pressed = True;
>>>>>>> e1da9b8f61ab67b59da00c1bd8c7f1df825110bb
    break
  }
  console.log(event.key)
});

window.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'd':
<<<<<<< HEAD
      keys.d.pressed =  false
    break
    case 'a':
      keys.a.pressed = false
=======
      keys.d.pressed = False;
    break
    case 'a':
      keys.a.pressed = False;
>>>>>>> e1da9b8f61ab67b59da00c1bd8c7f1df825110bb
    break
  }
  console.log(event.key)
})
