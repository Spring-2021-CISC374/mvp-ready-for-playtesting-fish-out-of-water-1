export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.tilemapTiledJSON('sewer1', 'assets/Maps/Sewer1.json')
    this.load.image('pipes', 'assets/img/Pipes.png')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('LevelOneScene')
  }
}
