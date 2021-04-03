export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.image('fish', 'assets/img/phaser-logo.png')
    this.load.image('phaser-logo', 'assets/Images/Pipes.png')
		this.load.tilemapTiledJSON('sewer1', 'assets/Maps/Sewer1.json')
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene')
  }
}
