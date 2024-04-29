import Phaser from "phaser";
export default class bullet extends
    Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.setScale(1)
    }
    fire(x, y) {
        this.setPosition(x+ 90, y-8)
        this.setActive(true)
        this.setVisible(true)
    }
    die() {
        this.destroy()
    }
    update(time) {
        this.setVelocityX(250)
        if (this.x<-10){
            this.die
        }
    }
}