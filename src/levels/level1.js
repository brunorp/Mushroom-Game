import { Public } from '../public/func.js';

const p1 = new Public();
const gameState = {};
let counter = Math.floor(Math.random() * 7), timer;
let gameOver = false;

export const level1 = new Phaser.Scene('Level1');

    level1.preload = function(){
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
    this.load.image('crate', './assets/scene/Object/Crate.png')

    this.load.spritesheet('dude', './assets/char/dude.png', { frameWidth: 32, frameHeight: 48 });
}

level1.create = function(){
    this.add.image(500, 300, 'background');
    this.add.text(16, 16, 'Level: 1', { fontSize: '32px', fill: '#000' });

    let platforms = this.physics.add.staticGroup();

    platforms.create(63, 568, 'floor1')
    gameState.floor2 = this.physics.add.staticGroup({
        key: 'floor2',
        repeat: 2,
        setXY: { x: 119, y: 568, stepX: 128 }
    });
    gameState.water = this.physics.add.staticGroup({
        key: 'water1',
        repeat: 1,
        setXY: { x: 503, y: 568, stepX: 128 }
    })
    platforms.create(758, 568, 'floor2');
    platforms.create(830, 440, 'floor13');
    platforms.create(570, 340, 'floor14');

    platforms.create(63, 240, 'floor14');
    platforms.create(191, 240, 'floor14');
    gameState.floor8 = this.physics.add.staticGroup({
        key: 'floor14',
        repeat: 1,
        setXY: { x: 191, y: 240, stepX: 128 }
    });

    gameState.mush  = this.physics.add.staticGroup({
        key: 'mushroom',
        repeat: 0,
        setXY: { x: 35, y: 174, stepX: 2 }
    });

    gameState.player = this.physics.add.sprite(45, 450, 'dude');

    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);
    
    (async () => 
        await new Promise((resolve, reject) => {
            timer = setInterval(() => {
                gameState.crate = this.physics.add.group({
                    key: 'crate',
                    repeat: counter,
                    setXY: { x: Math.floor(Math.random() * 300), y: 0, stepX: 200 }
                });
                this.physics.add.collider(gameState.crate, gameState.player, () => { p1.hitDie(gameState.player, timer, this.physics, gameOver) }, null, this);
                if(gameOver){
                    clearInterval(timer);
                    resolve();
                } 
            }, 2000)
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
    this.physics.add.collider(gameState.player, gameState.floor2);
    this.physics.add.collider(gameState.player, gameState.floor8);
    this.physics.add.collider(gameState.player, gameState.mush, () => { p1.hitMush(this.scene, 1, timer) }, null, this);
    this.physics.add.collider(gameState.player, gameState.water, () => { p1.hitDie(gameState.player, timer, this.physics, gameOver) }, null, this);
}

let controlJump = true;
let contJump = 0;
level1.update = function(){ 
    if(gameOver){
        return;
    }
    counter = Math.floor(Math.random() * 10);
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


