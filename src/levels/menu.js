import { Public } from '../public/func.js';
let p1 = new Public();

export const menu = new Phaser.Scene('menu');

menu.preload = function(){
    this.load.image('bg', './static/scene/BG/menuBG.jpg')
}

menu.create = function(){
   this.add.image(500, 300, 'bg');
   let start = this.add.text(550, 250, 'Start', {fontSize: '50px', fill:'#000', fontStyle: 'bold'})
   this.add.text(380, 150, 'The Mushroom Game', {fontSize: '40px', fill:'#000'})
   start.setInteractive({ useHandCursor: true })
   .on('pointerover', () => start.setStyle({ fill: '#D62D20'}))
   .on('pointerout', () => start.setStyle({ fill: '#000'}))
   .on('pointerdown', () => p1.nextScene(this.scene, 1));
}