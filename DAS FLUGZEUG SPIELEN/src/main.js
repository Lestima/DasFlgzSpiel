import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import start from './scenes/start'
import lvl1 from './scenes/gameScene'
import gameOver from './scenes/gameOver'
const config = {
	type: Phaser.AUTO,
	width: 765,
	height: 430,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	
	scene: [start, lvl1, gameOver],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
		
	},
}

export default new Phaser.Game(config)
