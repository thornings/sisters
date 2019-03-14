import { Tilemaps } from "phaser";

export class Test extends Phaser.Scene {
    constructor() {
        super("main");
    }

    preload() {
        // this.load.atlas(
        //     'man', 
        //     './assets/spritesheets/sheet2/man.png', 
        //     './assets/spritesheets/sheet2/man.json' );
        // this.load.atlas(
        //     'environment', 
        //     './assets/spritesheets/environment/gsistersSpriteSheet.png', 
        //     './assets/spritesheets/environment/gsistersSpriteSheet.json' );
        this.load.image('tiles', './assets/spritesheets/environment/gsistersSpriteSheet.png');
    }

    tileMap() 
    {
        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
            [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
          ];
        
          // When loading from an array, make sure to specify the tileWidth and tileHeight
          const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
          const tiles = map.addTilesetImage("tiles");
          const layer = map.createStaticLayer(0, tiles, 0, 0);
    }
    
    create() {
        this.tileMap();
        this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2,'bob');
        this.add.image(this.sys.canvas.width / 2, 600,'tiles');

       // var tiles = this.add.sprite(100,100, 'environment', 'gsisters_01.png');
        
        // var man = this.add.sprite(100,100, 'man', 'metalslug_01.png');
        // var walker = {
        //     key: 'walk',
        //     frames: this.anims.generateFrameNumbers('man', {start: 1, end: 3}),
        //     frameRate: 5,
        //     repeat: -1
        // };

       

    }
}