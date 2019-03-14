import { Tilemaps } from "phaser";
import { Physics } from 'phaser';

// public class ObjectEntity {
//     public height: number = 0;
//     public name: string = "";
//     public properties: any;
//     public rectange: boolean = true;
//     public rotation: number = 0;
//     public type: string = "";
//     public visible: boolean = true;
//     public width: number = 0;
//     public x: number = 0;
//     public y: number = 0;
// }

export class Main extends Phaser.Scene 
{
    private player: any;
    private playerFasingRight: boolean = true;
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

        this.load.spritesheet('spriteSheet', 'assets/spritesheets/Sisters_spriteSheet.png', { frameWidth: 24, frameHeight: 24, startFrame: 1, endFrame: 300 });

        this.scoreText = this.add.text(30, 30, '0', { fontSize: '24px', fill: '#FFF' });
        this.livesText = this.add.text(600, 30, '3', { fontSize: '24px', fill: '#FFF' });        

        this.jumpPower = 0;
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
        var config = 
        {
                key: name,
                frames: this.anims.generateFrameNames('spriteSheet', 
                {   
                    start: startTile,
                    end: endTile,
                    zeroPad: 2
                }),
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

        // const layer = map.createStaticLayer('TileLayer1', tileset, 0, 0);
       // layer.scaleX=2;
       // layer.scaleY=2;
        this.walls = map.createDynamicLayer('walls', tileset, 0, 200);
        this.walls.setCollisionByExclusion([-1]);
        
        /*tilemap objects */
        console.log("before");
        //let gameObjects = map.createDynamicLayer('GameObjects', tileset, 0, 200);
       // console.log("test " + gameObjects.data.count);
        // var objects = map.filterObjects('GameObjects', function() {
        //     m => m.name = 'sprite'
        // });
        //map.objects.filter('GameObjects', )
        for (let obj in map.getObjectLayer('GameObjects').objects)
        {
           // console.log("entity: " + obj.);

        }
        
        //const enemy = map.findObject("GameObjects", obj => obj.type === "sprite");
       // let enemies[]:any[];
        for (var object_layer in map.objects) {
            //if ()
            
            // console.log('sss '+object_layer); 
            // console.log("after"+enemy.name);
        }
         // player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");
        //var start = <ObjectEntity>map.objects['GameObjects'][0];
        //console.log(map.objects.length);
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

        /* from animation spriteSheet */
        this.createAnimation('star', 61,67);
        this.createAnimation('diamondBox', 140,146,4);
        this.createAnimation('boxExplosion', 161,167,4,0);
        this.createAnimation('enemy', 180,181,4);
        this.createAnimation('enemyDead', 182,182);
        this.createAnimation('weaponBall', 200,207,5);
        this.createAnimation('GianaNormalWalk', 241,244,5);
        this.createAnimation('GianaNormalIdle', 240,240,5);
        this.createAnimation('GianaDead', 247,247);
        this.createAnimation('GianaHairWalk', 261,264,5);
        this.createAnimation('GianaUpgrade', 280,280);

        /* enemies */
        let enemies =  map.createFromObjects('e', 2, { key: 'overlap_item' });

        // var ladders = this.add.group({
        //     key: 'enemies',
        //     setXY: { x: overlapObjects[0].x, y: overlapObjects[0].y },
        //     setScale: { x: overlapObjects[0]._scaleX, y: overlapObjects[0]._scaleY }

        // });

        /* player */
        this.player = this.physics.add.sprite(200, 300, 'giana').play('GianaNormalIdle');
        this.player.setOrigin(0.5, 0);
        this.player.setBounce(0, 0);
        this.player.scaleY = 1.0;
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(1000);
        this.physics.add.collider(this.player, this.walls);
        this.cameras.main.startFollow(this.player);

        /* keyboard input */        
        this.cursors = this.input.keyboard.createCursorKeys();
  
    }

    createFromObjects(scene:any, name:string, id:string, customClass:any, spriteConfig:any)
    {
        if( spriteConfig == undefined ) spriteConfig = {}

        var objectLayer = scene.map.getObjectLayer(name);
        if (!objectLayer)
        {
            console.warn('Cannot create from object. Invalid objectgroup name given: ' + name);
            return;
        }

        var objects = objectLayer.objects;
        var sprites = [];

        for (var i = 0; i < objects.length; i++)
        {
            var found = false;
            var obj = objects[i];

            if (obj.gid !== undefined && typeof id === 'number' && obj.gid === id ||
                obj.id !== undefined && typeof id === 'number' && obj.id === id ||
                obj.name !== undefined && typeof id === 'string' && obj.name === id)
            {
                found = true;
            }
            

            if (found)
            {
                //var config = Object.assign(spriteConfig, obj.properties);
                var config = spriteConfig;

                config.x = obj.x;
                config.y = obj.y;

                let sprite
                if( customClass != undefined ) 
                {
                    sprite = new customClass( config )
                } else 
                {
                    sprite = scene.make.sprite( config )
                }

                sprite.name = obj.name;

                if (obj.width) { sprite.displayWidth = obj.width; }
                if (obj.height) { sprite.displayHeight = obj.height; }

                // Origin is (0, 1) in Tiled, so find the offset that matches the Sprite's origin.
                var offset = {
                x: sprite.originX * sprite.displayWidth,
                y: (sprite.originY - 1) * sprite.displayHeight
                };

                // If the object is rotated, then the origin offset also needs to be rotated.
                if (obj.rotation)
                {
                // var angle = DegToRad(obj.rotation);
                // Rotate(offset, angle);
                // sprite.rotation = angle;
                }

                if (obj.flippedHorizontal !== undefined || obj.flippedVertical !== undefined)
                {
                sprite.setFlip(obj.flippedHorizontal, obj.flippedVertical);
                }

                if (!obj.visible) { sprite.visible = false; }

                sprites.push(sprite);
            }
        }
        return sprites;
    }

   
    theGameText() {
        // var t = this.game.add.text(200, 500, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
        // t.fixedToCamera = true;
        // t.cameraOffset.setTo(200, 500);
    }

    update() 
    {
        var displayWidth = this.camera.displayWidth;
        var displayHeight = this.camera.displayHeight;
        var halfScreenSize = this.camera.width/2;

        if (this.cursors.left.isDown)
        {
            this.player.x-=1.5;
            this.player.play('GianaNormalWalk');
            if (this.playerFasingRight)
            {
                this.playerFasingRight = false;
                this.player.flipX = 1;
            }
            // if (this.player.x - 3 > Math.abs(this.camera.x)+20) {
            //     this.player.x -= 3;
            // }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.play('GianaNormalWalk');
            this.player.x+=1.5;
            if (!this.playerFasingRight) {
                this.playerFasingRight = true;
                this.player.flipX = 0;
            }

            
            // if (this.player.x + 3 < halfScreenSize) {
            //     this.player.x += 3;
            // }
            // else {
                
            //     this.camera.x-=3;
            //     this.player.x += 3;
            // }
        } else {
            this.player.play('GianaNormalIdle');
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
                this.player.body.jumpSpeed = 200;
                this.player.setVelocityY(this.jumpMinPower);
                
            }
            else if ((Math.abs(this.jumpPower) > 100))
            {
                //this.player.body.data.velocity-=100;
               // this.player.setVelocityY(this.player.body.velocity.y - 60);
               this.player.body.jumpSpeed = 400;
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
/*
 player.setMaxVelocity(500).setFriction(1000, 100);

    player.body.accelGround = 1200;
    player.body.accelAir = 600;
    player.body.jumpSpeed = 500;

*/