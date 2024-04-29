import Phaser from 'phaser'
export default class gameScene extends Phaser.Scene {
    constructor() {
        super('start-scene')
    }
    init(data) {
        this.replayButton = undefined
        this.score = data.score
    }
    preload() {
        this.load.image('background', 'images/fullcolor.png')
        this.load.image('play-button', 'images/play-button.png')
        this.load.image('name', 'images/game-name.png')
    }
    create() {
        this.add.image(382, 215, 'background').setScale(2)
        //change below to image (make later)
        this.add.image(382,215,'name').setScale(0.3)
        this.replayButton = this.add.image(382, 330, 'play-button').setScale(0.75).setAlpha(2)
            .setInteractive().setScale(0.4)

        
        this.replayButton.once('pointerup', () => {
            this.scene.start('level-one')
        }, this)
    }
}