import Phaser from 'phaser'
import enemyObject from '../ui/enemyObject'
import bullet from '../ui/bullet'

const Assetkeys = {
    sky: 'sky',
    cloudFront: 'cloudFront',
    cloudMid: 'cloudMid',
    mountainFar: 'mountainFar',
    mountain: 'mountain'
}

export default class lvl1 extends

    Phaser.Scene {
    constructor() {
        super('level-one')
    }
    init() {

        this.bg = Phaser.GameObjects.TileSprite
        this.player = undefined
        this.speed = 100
        this.enemySpeed = 100
        this.enemies = undefined
        this.life = 3
        this.score = 0
        this.scoreLabel = undefined
        this.cursor = undefined
        this.shoot = false
        this.bullet = undefined
        this.lastFired = 0
        this.fire = undefined
        this.explode = undefined
    }

    preload() {

        this.load.image(Assetkeys.sky, 'images/sky.png')
        this.load.image(Assetkeys.mountainFar, 'images/far_mountains.png')
        this.load.image(Assetkeys.mountain, 'images/grassy_mountains.png')
        this.load.image(Assetkeys.cloudMid, 'images/clouds_mid.png')
        this.load.image(Assetkeys.cloudFront, 'images/clouds_front.png')
        // this.load.image('bg', 'images/fullcolor.png')

        this.load.spritesheet('me262', 'images/me262.png', {
            frameWidth: 1181,
            frameHeight: 391
        })
        this.load.spritesheet('p51d', 'images/p51D.png', {
            frameWidth: 1181,
            frameHeight: 391,


        })
        this.load.spritesheet('mig15', 'images/mig15bis.png', {
            frameWidth: 1181,
            frameHeight: 391
        })
        //391x1181 height:width

        this.load.spritesheet('bullet', 'images/laser-bolts.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.spritesheet('explosion', 'images/explosion.png',{
            frameHeight:16,
            frameWidth:16
        })

    }

    create() {

        this.bg = this.add.tileSprite(384, 215, 384, 216, Assetkeys.sky).setScale(2)
        this.mountainFar = this.add.tileSprite(384, 215, 384, 216, Assetkeys.mountainFar).setScale(2)
        this.mountain = this.add.tileSprite(384, 215, 384, 216, Assetkeys.mountain).setScale(2)
        this.cloudMid = this.add.tileSprite(384, 215, 384, 216, Assetkeys.cloudMid).setScale(2)
        this.cloudFront = this.add.tileSprite(384, 215, 384, 216, Assetkeys.cloudFront).setScale(2)

        this.enemies = this.physics.add.group({
            classType: enemyObject,
            maxSize: 100,
            runChildUpdate: true,

        })

        this.bullet = this.physics.add.group({
            classType: bullet,
            maxSize: 500000000000000000000,
            runChildUpdate: true,

        })

        this.cursor = this.input.keyboard.createCursorKeys()
        this.player = this.createPlayer()

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })

        this.physics.add.overlap(
            this.bullet,
            this.enemies,
            this.hitEnemy,
            null,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.crash,
            null,
            this
        )

        this.scoreLabel = this.add.text(10, 10, 'Score', {
            fontSize: '16px',
            // @ts-ignore
            fill: 'black',
            backgroundColor: 'white'
        }).setDepth(1)
        this.scoreLabel.setText('Score: ' + this.score)

    }

    update(time) {
        this.parallax()
        this.movePlayer(time)
        this.scoreLabel.setText('Score: ' + this.score)
    }

    parallax() {
        // @ts-ignore
        this.bg.tilePositionX += 0.1
        this.mountainFar.tilePositionX += 0.4
        this.mountain.tilePositionX += 0.6
        this.cloudMid.tilePositionX += 1.2
        this.cloudFront.tilePositionX += 2.6
    }

    createPlayer() {
        const player = this.physics.add.sprite(200, 300, 'me262').setScale(0.15)
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('me262', {
                start: 1, end: 11
            })
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('me262', {
                start: 1, end: 11
            })
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('me262', {
                start: 1, end: 11
            })
        })
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('me262', {
                start: 1, end: 11
            })
        })
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('me262', {
                start: 1, end: 11
            })
        })
        return player

    }

    movePlayer( time) {



        if (this.cursor.left.isDown) {
            this.player.setVelocityX(this.speed * -1)
            this.player.anims.play('left', true)
            
        }
        else if (this.cursor.right.isDown) {
            this.player.setVelocityX(this.speed)
            this.player.anims.play('right', true)
        }
        else if (this.cursor.up.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(this.speed * -1)
            this.player.anims.play('up', true)
            
        }
        else if (this.cursor.down.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(this.speed)
            this.player.anims.play('down', true)
            
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.player.anims.play('turn',true)
            
        }

        if (this.cursor.space.isDown && this.lastFired < time) {
            const bullet = this.bullet.get(0, 0, 'bullet')
            if (this.bullet) {
                //@ts-ignore
                bullet.fire(this.player.x, this.player.y)
                this.lastFired = time + 300
            }
        }
    }
    spawnEnemy() {
        const config = {
            speed: 30,
        }
        // @ts-ignore
        const enemy = this.enemies.get(0, 0, 'p51d', config).setScale(0.13).setFlipX(true)
        const positionY = Phaser.Math.Between(50, 300)
        const positionX = 730
        if (enemy) {
            enemy.spawn(positionX, positionY)
        }
        

    }

    hitEnemy(bullet, enemy) {
        bullet.die()
        enemy.die()
        this.score++
        
    }

    explosion(){
        const explode = this.physics.add.sprite(this.player.x, this.player.y, 'explosion')
        //const player = this.physics.add.sprite(200, 300, 'me262').setScale(0.15)
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 1, end: 5
            })
        })
        if(explode){
        this.explode.anims.play('explosion', true)
        console.log("a")}
    
    }

    crash(player,enemy){
        // player.destroy()
        // enemy.die()
        // this.explosion()
        
        this.scene.start('over-scene', { score: this.score })
    }

}
