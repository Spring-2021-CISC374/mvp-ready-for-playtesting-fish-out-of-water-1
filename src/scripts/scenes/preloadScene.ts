export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.image('temp', 'assets/img/phaser-logo.png')
    this.load.image('phaser-logo', 'assets/Images/Pipes.png')
		this.load.tilemapTiledJSON('sewer1', 'assets/Maps/Sewer1.json')
  }
  create() {
    this.scene.start('MainScene')
  }
}
