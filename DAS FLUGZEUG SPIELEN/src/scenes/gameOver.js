import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('over-scene')
    }
    init(data) {
        this.replayButton = undefined
        this.score = data.score
    }
    preload() {
        this.load.image('background', 'images/fullcolor.png')
        this.load.image('gameover', 'images/gameover.png')
        this.load.image('replay', 'images/replay-button.png')
        this.load.image('name', 'images/game-name.png')
    }
    create() {
        this.add.image(382,215,'background').setScale(2)
        this.add.image(382,215,'name').setScale(0.3)

        this.replayButton = this.add.image(382, 330, 'replay').setScale(0.75).setAlpha(2)
        .setInteractive().setScale(0.4)

        this.add.text(340, 270, 'Score: ' + this.score, {
        // @ts-ignore
        fontSize: '16px', fill: 'black', backgroundColor: 'white'
    })
    


    this.replayButton.once('pointerup', () => {
        this.scene.start('level-one')
    }, this)

    }
    
}