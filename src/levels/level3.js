let gameOver = false, timer;
const gameState = {}

export const level3 = new Phaser.Scene('Level3');
level3.x = -200;
level3.preload = function () {

    this.load.image('background', './assets/scene/BG/bg.png')

    this.load.image('floor1', './assets/scene/Tiles/1.png')
    this.load.image('floor2', './assets/scene/Tiles/2.png')
    this.load.image('floor3', './assets/scene/Tiles/3.png')

    this.load.image('floor13', './assets/scene/Tiles/13.png')
    this.load.image('floor14', './assets/scene/Tiles/14.png')
    this.load.image('floor15', './assets/scene/Tiles/15.png')

    this.load.image('water1', './assets/scene/Tiles/17.png')
    this.load.image('water2', './assets/scene/Tiles/18.png')

    this.load.image('mushroom', './assets/scene/Object/Mushroom_1.png')
    this.load.image('mushroom2', './assets/scene/Object/Mushroom_2.png')

    this.load.image('crate', './assets/scene/Object/Crate.png')
    this.load.image('stone', './assets/scene/Object/Stone.png')

    this.load.spritesheet('dude', './assets/char/dude.png', { frameWidth: 32, frameHeight: 48 });
};

level3.create = function () {
    this.physics.world.gravity.x = -200
    this.add.image(500, 300, 'background');
    this.add.text(16, 16, 'Level: 3', { fontSize: '32px', fill: '#000' });

    let platforms = this.physics.add.staticGroup();
   
    gameState.mushroom = this.add.image(40, 310, 'mushroom');

    gameState.water = this.physics.add.staticGroup({
        key: 'water1',
        repeat: 6,
        setXY: { x: 63, y: 565, stepX: 128 }
    })

    gameState.player = this.physics.add.sprite(750, 320, 'dude');

    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);

    gameState.crate = this.physics.add.group({
        key: 'crate',
        repeat: 2,
        setXY: { x: 800, y: 450, stepX: 0 }
    });
    
    (async () => 
        await new Promise((resolve, reject) => {
            timer = setInterval(() => {
                gameState.crate = this.physics.add.group({
                    key: 'crate',
                    repeat: 2,
                    setXY: { x: 800, y: 450, stepX: 0 }
                });
                this.physics.add.collider(gameState.crate, gameState.player);
                if(gameOver){
                    clearInterval(timer);
                    resolve();
                } 
                this.physics.add.collider(gameState.crate, gameState.water);
                this.physics.add.collider(gameState.player, gameState.crate);
            }, 1000)
        })
    )();


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.player, gameState.mushroom2);
    this.physics.add.collider(gameState.player, gameState.mushroom, level3.hitMush, null, this);
    this.physics.add.collider(gameState.player, gameState.water, level3.hitCrate, null, this);
    this.physics.add.collider(gameState.crate, gameState.water);
    this.physics.add.collider(gameState.player, gameState.crate);
}


let controlJump = true;
let contJump = 0;
level3.update = function(){ 
    if(gameOver){
        return;
    }
    if(gameState.cursors.left.isDown){
        gameState.player.setVelocityX(-200)
        gameState.player.anims.play('left', true)
    }else if(gameState.cursors.right.isDown){
        gameState.player.setVelocityX(200)
        gameState.player.anims.play('right', true)
    }else{
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('turn', true)
    }
    if(gameState.cursors.up.isDown){
        if(controlJump && contJump < 2){
            contJump++;
            gameState.player.setVelocityY(-310);
            controlJump = false;
        }
    }else  if (gameState.cursors.up.isUp) {
        controlJump = true;    
    }
    if(gameState.cursors.down.isDown){
        gameState.player.setVelocityY(300);
    }
    if(contJump === 2 && gameState.player.body.touching.down){
        contJump = 0;
    }
}

level3.hitCrate = function(player, crate) {
    clearInterval(timer);
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.physics.pause();
    gameOver = true;
}

level3.hitMush = function(player, mush){
    clearInterval(timer);
    console.log('you win')
    this.physics.pause();
    player.setTint(0x00FF00);
    player.anims.play('turn');
    this.scene.start(level3)
}