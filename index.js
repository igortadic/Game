const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .9;

const player = new Fighter({
    position: {
    x: 100,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 155
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/jump.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    }
  }
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 190
  },
  imageSrc: './img/shop.png',
  scale: 2.3,
  framesMax : 6
})

const enemy = new Fighter({
  position: {
    x: 900,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 165
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    }
  }
});

enemy.draw();

console.log(player);

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  player.switchSprite('idle')
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = - 5;
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run')
  }

//player jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }
//enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = - 5;
    enemy.switchSprite('Run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    player.switchSprite('Run')
    enemy.velocity.x = 5;
  } else {
    enemy.switchSprite('idle')
  }

// enemy jumping
if (enemy.velocity.y < 0) {
  enemy.switchSprite('jump')
} else if (enemy.velocity.y > 0) {
  enemy.switchSprite('fall')
}

  // detect for collision
  if (
    RectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    console.log('go')
  }

  if (
    RectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'
    console.log('enemy attack succesful')
  }

  // end game if health === 0
  if(enemy.health <=0 || player.health <=0) {
    determineWinner({player, enemy, timerId})
  }
}

animate();

window.addEventListener('keydown', (event) => {
  console.log(event.key);
  switch(event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
    break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
    break
    case 'w':
      player.velocity.y = -20
    break
    case ' ':
      player.attack();
    break
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
    break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
    break
    case 'ArrowUp':
      enemy.velocity.y = -20
    break
    case 'ArrowDown':
      enemy.attack();
    break;
  }
  console.log(event.key)
});

window.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'd':
      keys.d.pressed =  false
    break
    case 'a':
      keys.a.pressed = false
    break
  }

  //enemy control keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed =  false
    break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
    break
  }
  console.log(event.key)
})
