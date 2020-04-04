import { config } from '../main.js';

export class Public {
    contructor(){
        this.hitDie = hitDie;
        this.hitMush = hitMush;
    }

    hitMush = function(scen, level, timer){
        console.log('hittou')
        clearInterval(timer);
        scen.start(config.scene[level])
    }

    hitDie = function(player, timer, phys, gameOver) {
        clearInterval(timer);
        player.setTint(0xff0000);
        phys.pause();
        gameOver = true;
    }
}