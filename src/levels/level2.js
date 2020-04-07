import { Public } from '../public/func.js';

let counter = Math.floor(Math.random() * 7), timer;
let gameOver = false;
const gameState = {}
const p1 = new Public();

export const level2 = new Phaser.Scene('Level2');

level2.preload = function () {

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

level2.create = function () {
    this.add.image(500, 300, 'background');
    this.add.text(16, 16, 'Level: 2', { fontSize: '32px', fill: '#000' });
    let restart = this.add.text(650, 16, 'Restart', { fontSize: '32px', fill: '#000' })
    restart.setInteractive({ useHandCursor: true })
    .on('pointerover', () => restart.setStyle({ fill: '#D62D20'}))
    .on('pointerout', () => restart.setStyle({ fill: '#000'}))
    .on('pointerdown', () => p1.restartScene(this.scene, timer));

    let platforms = this.physics.add.staticGroup();
    
    platforms.create(63, 568, 'floor1')
    platforms.create(119, 568, 'floor2')
    platforms.create(400, 510, 'stone')
    platforms.create(590, 510, 'stone')
    platforms.create(830, 435, 'floor13');

    gameState.mushroom2 = this.physics.add.staticGroup({
        key: 'mushroom2',
        repeat: 2,
        setXY: { x: 200, y: 360, stepX: 200 }
    });

    gameState.mush  = this.physics.add.staticGroup({
        key: 'mushroom',
        repeat: 0,
        setXY: { x: 40, y: 310, stepX: 2 }
    });

    gameState.water = this.physics.add.staticGroup({
        key: 'water1',
        repeat: 4,
        setXY: { x: 247, y: 565, stepX: 128 }
    })

    
    gameState.player = this.physics.add.sprite(30, 450, 'dude');

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
    this.physics.add.collider(gameState.player, gameState.mushroom2);
    this.physics.add.collider(gameState.player, gameState.mush, () => { p1.hitMush(this.scene, 3, timer) }, null, this);
    this.physics.add.collider(gameState.player, gameState.water, () => { p1.hitDie(gameState.player, timer, this.physics, gameOver) }, null, this);
}


let controlJump = true;
let contJump = 0;
level2.update = function(){ 
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