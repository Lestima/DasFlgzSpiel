import Phaser from "phaser";
export default class enemyObject extends
    Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, config) {
        super(scene, x, y, texture)
        this.scene = scene
        this.speed = config.speed
    }
    spawn(positionX, positionY) {
        this.setPosition(positionX, positionY)
        this.setActive(true)
        this.setVisible(true)
    }
    die() {
        this.destroy()
        
    }
    update(time) {
        this.setVelocityX(this.speed *-2)

        const gameWidth = this.scene.scale.width
        if (this.x > gameWidth + 5) {
            this.die
        }
        this.enemyAnimate()
    }

    enemyAnimate() {
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('p51d', {
                start: 1, end: 11
            })
        })
        this.anims.play('turn', true)
    }
}