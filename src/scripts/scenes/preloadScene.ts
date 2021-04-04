export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.tilemapTiledJSON('sewer1', 'assets/Maps/Sewer1.json')
    this.load.image('pipes', 'assets/img/Pipes.png')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.atlas('flounder', 'assets/Sprites/Flounder.png','assets/Sprites/Flounder.json' )
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('LevelOneScene')

    this.anims.create({
      key: 'flounder-idle',
      frames: this.anims.generateFrameNames( 'flounder', {start: 1, end: 2, prefix: 'Flounder ', suffix: '.png'}),
      repeat: -1,
      frameRate: 15
    })
    
  }
}
