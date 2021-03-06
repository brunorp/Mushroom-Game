import { level1 } from './levels/level1.js'
import { level2 } from './levels/level2.js'
import { level3 } from './levels/level3.js'
import { menu } from './levels/menu.js';

export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 800,
                x: 0
            }
        }
    },
    scene: [menu, level1, level2, level3],
}

const game = new Phaser.Game(config);