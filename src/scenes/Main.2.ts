import { Tilemaps } from "phaser";
import { Physics } from 'phaser';

class ObjectEntity {
    public height: number = 0;
    public name: string = "";
    public properties: any;
    public rectange: boolean = true;
    public rotation: number = 0;
    public type: string = "";
    public visible: boolean = true;
    public width: number = 0;
    public x: number = 0;
    public y: number = 0;
}

export class Main extends Phaser.Scene 
{
    private player: any;
    private cursors: any;
    private platforms: any;
    // private tileset: any;
    private wordStage: any;
    private camera: any;
    private score = 0;
    private scoreText : any;;
    private livesText : any;;
    private walls: any;
    private jumpPower: any;
    private jumpExtended: boolean = false;
    private jumpMinPower: integer = -400;
    private jumpMaxPower: integer = -600;  
    private isJumping: boolean = false;
    //private prefabs[]: any[];


    constructor() {
        super("main");

    }

    preload() {
        this.load.tilemapTiledJSON('level1', './assets/tilemaps/tilemap/environment_tilemap.json');      
        this.load.image('tiles', './assets/tilemaps/tilemap/Sisters_spriteSheet.png');
        this.load.image('player', './assets/images/player.png');
        
        this.scoreText = this.add.text(30, 30, 'afsd', { fontSize: '24px', fill: '#FFF' });
        this.livesText = this.add.text(600, 30, '0', { fontSize: '24px', fill: '#FFF' });
        this.load.tilemapTiledJSON('sprites', './assets/spritesheets/player/playerSprites.json.json');
        
        this.load.spritesheet('spriteSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 61, endFrame: 68 });
        
        // this.load.spritesheet('StarSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 61, endFrame: 68 });
        // this.load.spritesheet('DiamondBoxSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 141, endFrame: 147 });
        // this.load.spritesheet('BoxSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 161, endFrame: 167 });
        // this.load.spritesheet('EnemySheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 181, endFrame: 182 });
        // this.load.spritesheet('EnemyDeadSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 183, endFrame: 183 });
        // this.load.spritesheet('WeaponBallSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 201, endFrame: 208 });
        // this.load.spritesheet('GianaNormalWalkSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 241, endFrame: 246 });
        // this.load.spritesheet('GianaHairWalkSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 261, endFrame: 266 });
        // this.load.spritesheet('GianaDeadSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 248, endFrame: 248 });
        // this.load.spritesheet('GianaUpgradeWeaponSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 281, endFrame: 281 });
        
        this.jumpPower = 0;

        // this.load.atlas(
        //     'sprites', 
        //     './assets/spritesheets/player/playerSprites.png', 
        //     './assets/spritesheets/player/playerSprites.json' );
    }

    create_spriteArr_direct_From_map()
    {
        // var conf = {
        //     key: 'enemyAnimation',
        //     frames: this.anims.generateFrameNumbers('spriteSheet', { start:181, end: 182 }),
        //     frameRate: 20,
        //     repeat: -1
        // };
        //map.createFromObjects('GameObjects', 'enemy', conf, this );
    }


    create_object(object: any, map: any) {
        "use strict";
        var position, prefab;
        position = {"x": object.x + (map.tileHeight / 2), "y": object.y - (map.tileHeight / 2)};
        // create object according to its type
        switch (object.type) {
        // case "player":
        //     prefab = new Player(this, position, object.properties);
        //     break;
        case "enemy":
            //const spawnPoint = map.findObject("enemy1", obj => obj.name === "Spawn Point");
            alert("enemy " + position + " - " + object.properties);
            //prefab = new Enemy(this, position, object.properties);
            break;
        // case "powerup":
        //     prefab = new PowerUp(this, position, object.properties);
        //     break;
        // case "goal":
        //     prefab = new FinishLine(this, position, object.properties);
        //     break;
        }
       // this.prefabs[object.name] = prefab;
    };

    createAnimation(name:string, startTile:integer, endTile: integer, frameRateCustom: integer = 20, doRepeat:integer=-1 ) {
        var config = {
            key: name + 'Animation',
            frames: this.anims.generateFrameNumbers('spriteSheet', { start: startTile, end: endTile }),
            frameRate: frameRateCustom,
            repeat: doRepeat
        };
        this.anims.create(config);
    }

    create() {
        
       this.camera = this.cameras.main;
        
        /* tilemap */
        const map = this.make.tilemap({key:'level1'});
        const tileset = map.addTilesetImage('MyTileSet','tiles');   
        this.camera.setBounds(0, 0, map.widthInPixels*2, map.heightInPixels*2);
        this.physics.world.setBounds(0, 0, map.widthInPixels*2, map.heightInPixels*2);

    
        
       // alert(map.widthInPixels + "  --  " + map.heightInPixels);
        // const layer = map.createStaticLayer('TileLayer1', tileset, 0, 0);
       // layer.scaleX=2;
       // layer.scaleY=2;
        this.walls = map.createStaticLayer('walls', tileset,0,200);
        this.walls.setCollisionBetween(1, 24);
        /*tilemap objects */
//         const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
// player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");
        //var start = <ObjectEntity>map.objects['GameObjects'][0];
        console.log(map.objects.length);
        for (var object_layer in map.objects) {
            console.log('sss '+object_layer);

            // if (map.objects.has('GameObjects')) {             
            //     var entitys = map.objects[object_layer];
            //     //alert("layer name " + entitys.name);
            //     for (var entity in entitys) {
            //         console.log("object properties");
            //         //this.create_object(entity, map);
            //     }
            // } else {
            //     console.log("has no GameObjects");
            // }
        }

        /* player */
        this.player = this.physics.add.sprite(100, 320, 'player');
        this.player.setBounce(0, 0);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(1000);
        this.physics.add.collider(this.player, this.walls);
        this.cameras.main.startFollow(this.player);

        /* from animation spriteSheet */
        this.createAnimation('star', 61,68);
        this.createAnimation('diamondBox', 141,147);
        this.createAnimation('boxExplosion', 161,167);
        this.createAnimation('enemy', 181,182);
        this.createAnimation('enemyDead', 183,183);
        this.createAnimation('weaponBall', 201,208);
        this.createAnimation('GianaNormalWalk', 241,246);
        this.createAnimation('GianaDead', 248,248);
        this.createAnimation('GianaHairWalk', 261,266);
        this.createAnimation('GianaUpgrade', 281,281);

        //this.add.sprite(400, 300, 'spriteSheet').play('starAnimation');
        this.add.sprite(430, 300, 'spriteSheet').play('DiamondBoxAnimation');
        

        /* enemies */
        let enemies = this.add.group();
        //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
        //map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);
       // map.createFromObjects('GameObjects', 'enemy',   )
        // var walker = 
        // {
        //         key: 'walk',
        //         frames: this.anims.generateFrameNames('sprites', 
        //         {   
        //             prefix: 'Sisters_spriteSheet_',
        //             suffix: '.png',
        //             start: 1,
        //             end: 12,
        //             zeroPad: 2
        //         }),
        //         frameRate: 5,
        //         repeat: -1
        //     };
        //     this.anims.create(walker);
        //     this.man.play('walk');

        /* keyboard input */        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    tileMap() 
    {
          //this.platforms = this.physics.add.staticGroup();
       //this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2,'tiles');
      // this.physics.systems.start(Phaser.Physics.Arcade);
    //    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2,'bob');
    //    this.man = this.add.sprite(400,0, 'man', 'metalslug_01.png');
      // this.man.body.setGravityY(300)
       
    //    var walker = 
    //    {
    //         key: 'walk',
    //         frames: this.anims.generateFrameNames('man', 
    //         {   
    //             prefix: 'metalslug_',
    //             suffix: '.png',
    //             start: 1,
    //             end: 12,
    //             zeroPad: 2
    //         }),
    //         frameRate: 5,
    //         repeat: -1
    //     };
    //     this.anims.create(walker);
    //     this.man.play('walk');

      // this.tileMap();
        const org = [
            [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9 ],
            [  10,   11,   12,   13,   14,   15,   16,   17,   18,   19 ],
            [  20,   21,   22,   23,   24,   25,   26,   27,   28,   29 ],
            [  30,   31,   32,   33,   34,   35,   36,   37,   38,   39 ],
            [  40,   41,   42,   43,   44,   45,   46,   47,   48,   49 ],
            [  50,  51,   52,   53,   54,   55,   56,   57,   58,   59 ],
            [  60,   61,   62,   63,   64,   65,   66,   67,   68,   69 ],
            [  70,   71,   72,   73,   74,   75,   76,   77,   78,   79 ],
            [  80,   81,   82,   83,   84,   85,   86,   87,   88,   89 ],
            [  90,   91,   92,  93,   94,   95,   96,   97,   98,   99 ]
          ];

          const level = [
            [  99,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ], 
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
          ];
        
          // When loading from an array, make sure to specify the tileWidth and tileHeight
          //const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
        //   const map = this.make.tilemap({ data: org, tileWidth: 24, tileHeight: 24 });
          
        //   const tiles = map.addTilesetImage("tiles");
         
        //   const layer = map.createStaticLayer(0, tiles, 0, 0);
    }

    theGameText() {
        // var t = this.game.add.text(200, 500, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
        // t.fixedToCamera = true;
        // t.cameraOffset.setTo(200, 500);
    }

    update() {
        var displayWidth = this.camera.displayWidth;
        var displayHeight = this.camera.displayHeight;
        var halfScreenSize = this.camera.width/2;

        if (this.cursors.left.isDown)
        {
            this.player.x-=1.5;
            // if (this.player.x - 3 > Math.abs(this.camera.x)+20) {
            //     this.player.x -= 3;
            // }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x+=1.5;
            // if (this.player.x + 3 < halfScreenSize) {
            //     this.player.x += 3;
            // }
            // else {
                
            //     this.camera.x-=3;
            //     this.player.x += 3;
            // }
        }
    
        if (this.cursors.up.isDown)
        {
            this.isJumping = true; 
            // jump counter
            if (this.jumpPower>this.jumpMaxPower) {
                this.jumpPower -= 10;
            }
            
            if (this.player.body.onFloor())
            {
                this.player.setVelocityY(this.jumpMinPower);
            }
            else if ((Math.abs(this.jumpPower) > 100))
            {
                //this.player.body.data.velocity-=100;
                this.player.setVelocityY(this.player.body.velocity.y - 60);
              console.log("max" + this.jumpPower);
                this.isJumping = false;
                this.jumpPower = 0;
            }
           
        }
        else 
        { 
                this.jumpPower = 0;
                this.isJumping = false;
            this.livesText.setText("stopes power " + this.jumpPower );

        }

        this.scoreText.setText(""+ this.player.body.velocity.y );
    }
}