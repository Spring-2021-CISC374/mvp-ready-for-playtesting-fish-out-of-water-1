import HealthBar from "../objects/HealthBar"

export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    //Map
    this.load.tilemapTiledJSON('sewerlevel1', 'assets/Maps/sewerlevel1.json')
    this.load.tilemapTiledJSON('sewerlevel2', 'assets/Maps/sewerlevel2.json')
    this.load.image('pipes', 'assets/img/Pipes.png')
    this.load.image("messageBox", "assets/img/messageBox.png");
    this.load.image("closeButton", "assets/img/closeButton.png");
    this.load.image('PipePiece', 'assets/img/PipePiece.png')
    this.load.image('transparent', 'assets/img/Transparent.png')
    this.load.image('clog', 'assets/img/Clog.png')
    //Characters
    this.load.atlas('clown', 'assets/Sprites/ClownFish.png','assets/Sprites/ClownFish.json' )
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('sewer-combat', 'assets/img/SewerCombat.png')

    this.load.image('healthbar', 'assets/img/healthbar.png')
    this.load.image('shadowbar', 'assets/img/shadowbar.png')

    this.load.atlas('flounder', 'assets/Sprites/Flounder.png','assets/Sprites/Flounder.json' )
    this.load.atlas('combat', 'assets/Sprites/NinjaFish.png', 'assets/Sprites/NinjaFish.json')
    this.load.atlas('jellyfish', 'assets/Sprites/Jellyfish.png', 'assets/Sprites/Jellyfish.json')
    this.load.atlas('orca', 'assets/Sprites/Orca.png', 'assets/Sprites/Orca.json')
    this.load.atlas('shrimp', 'assets/Sprites/PurpleFish.png', 'assets/Sprites/PurpleFish.json')
    this.load.atlas('pufferfish', 'assets/Sprites/PufferFish.png', 'assets/Sprites/PufferFish.json')
    
    //Audio
    this.load.audio('sewermusic','assets/Music/sewermusic.mp3')
    this.load.audio('questionmusic','assets/Music/questionmusic.mp3')
    this.load.audio('combatmusic','assets/Music/combatmusic.mp3')
    this.load.audio('bumpsound','assets/Music/bumpsound.mp3')

    
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('LevelOneScene');

    this.anims.create({
      key: 'clown-idle',
      frames: this.anims.generateFrameNames( 'clown', {start: 1, end: 2, prefix: 'Clownfish ', suffix: '.png'}),
      repeat: -1,
      frameRate: 10
    })

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
      key: 'enemy-pufferfish',
      frames: this.anims.generateFrameNames('pufferfish', {start: 1, end: 2, prefix: 'Puffer Fish ', suffix: '.png'}),
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
