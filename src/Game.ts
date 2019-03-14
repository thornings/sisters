import "phaser";
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';
    
const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Preloader,
        Main
    ]
};

const game = new Phaser.Game(config);