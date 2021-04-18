import HealthBar from "../objects/HealthBar"

export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.tilemapTiledJSON('sewer1', 'assets/Maps/Sewer1.json')
    this.load.image('pipes', 'assets/img/Pipes.png')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('sewer-combat', 'assets/img/SewerCombat.png')

    this.load.image('healthbar', 'assets/img/healthbar.png')
    this.load.image('shadowbar', 'assets/img/shadowbar.png')

    this.load.atlas('flounder', 'assets/Sprites/Flounder.png','assets/Sprites/Flounder.json' )
    this.load.atlas('combat', 'assets/Sprites/NinjaFish.png', 'assets/Sprites/NinjaFish.json')
    this.load.atlas('jellyfish', 'assets/Sprites/Jellyfish.png', 'assets/Sprites/Jellyfish.json')
    this.load.atlas('orca', 'assets/Sprites/Orca.png', 'assets/Sprites/Orca.json')
    this.load.atlas('shrimp', 'assets/Sprites/PurpleFish.png', 'assets/Sprites/PurpleFish.json')
    
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('BattleScene')

    this.anims.create({
      key: 'flounder-idle',
      frames: this.anims.generateFrameNames( 'flounder', {start: 1, end: 2, prefix: 'Flounder ', suffix: '.png'}),
      repeat: -1,
      frameRate: 15
    })

    this.anims.create({
      key:'combat-flounder',
      frames: this.anims.generateFrameNames('combat', {start: 1, end: 2, prefix: 'Ninja Fish ', suffix:'.png'}),
      repeat: -1,
      frameRate: 5
    })

    this.anims.create({
      key: 'enemy-jellyfish',
      frames: this.anims.generateFrameNames('jellyfish', {start: 1, end: 2, prefix: 'Jellyfish ', suffix: '.png'}),
      repeat: -1,
      frameRate: 5
    })

    this.anims.create({
      key: 'shift-orca',
      frames: this.anims.generateFrameNames('orca', {start: 1, end: 2, prefix: 'Whale ', suffix: '.png'}),
      repeat: -1,
      frameRate: 5
    })

    this.anims.create({
      key: 'shift-shrimp',
      frames: this.anims.generateFrameNames('shrimp', {start: 1, end: 2, prefix: 'Purple Fish ', suffix: '.png'}),
      repeat: -1,
      frameRate: 5
    })
    
  }
}
