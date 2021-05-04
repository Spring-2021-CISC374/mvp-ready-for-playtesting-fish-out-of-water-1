export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    //Map
    this.load.tilemapTiledJSON('sewerlevel1', 'assets/Maps/sewerlevel1.json')
    this.load.tilemapTiledJSON('sewerlevel2', 'assets/Maps/sewerlevel2.json')
    this.load.image('pipes', 'assets/img/Pipes.png')
    this.load.image('background', 'assets/img/background.png' )

    //Images
    this.load.image("messageBox", "assets/img/messageBox.png");
    this.load.image('pipe1', 'assets/img/pipe1.png')
    this.load.image('pipe2', 'assets/img/pipe2.png')
    this.load.image('pipe3', 'assets/img/pipe3.png')
    this.load.image('pipe4', 'assets/img/pipe4.png')
    this.load.image('pipe5', 'assets/img/pipe5.png')

    this.load.image('transparent', 'assets/img/Transparent.png')
    this.load.image('clog', 'assets/img/Clog.png')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('sewer-combat', 'assets/img/SewerCombat.png')
    this.load.image('healthbar', 'assets/img/healthbar.png')
    this.load.image('shadowbar', 'assets/img/shadowbar.png')
    this.load.image('questionBox', 'assets/img/questionBox.png')
    this.load.image('extraLife', 'assets/img/extraLife.png')
    this.load.image('extraHealth', 'assets/img/extraHealth.png')
    this.load.image('extraDamage', 'assets/img/extraDamage.png')
    //Characters
    this.load.atlas('clown', 'assets/Sprites/ClownFish.png','assets/Sprites/ClownFish.json' )
    this.load.atlas('flounder', 'assets/Sprites/Flounder.png','assets/Sprites/Flounder.json' )
    this.load.atlas('combat', 'assets/Sprites/NinjaFish.png', 'assets/Sprites/NinjaFish.json')
    this.load.atlas('jellyfish', 'assets/Sprites/Jellyfish.png', 'assets/Sprites/Jellyfish.json')
    this.load.atlas('orca', 'assets/Sprites/Orca.png', 'assets/Sprites/Orca.json')
    this.load.atlas('shrimp', 'assets/Sprites/PurpleFish.png', 'assets/Sprites/PurpleFish.json')
    this.load.atlas('pufferfish', 'assets/Sprites/PufferFish.png', 'assets/Sprites/PufferFish.json')
    this.load.atlas('surgeon', 'assets/Sprites/SurgeonFish.png', 'assets/Sprites/SurgeonFish.json')
    
    //Audio
    this.load.audio('sewermusic','assets/Music/sewermusic.mp3')
    this.load.audio('questionmusic','assets/Music/questionmusic.mp3')
    this.load.audio('combatmusic','assets/Music/combatmusic.mp3')
    this.load.audio('bumpsound','assets/Music/bumpsound.mp3')
    this.load.audio('powerupsound','assets/Music/powerupsound.wav')
    this.load.audio('pipemusic','assets/Music/pipemusic.wav')



    // instructions images
    this.load.image('arrowKeyHelp', 'assets/img/arrowKeys.png')
    this.load.image('confirmHelp', 'assets/img/confirmHelp.png')
    this.load.image('pollHelp', 'assets/img/pollHelp.png')
    this.load.image('helpIcon', 'assets/img/helpIcon.png')
    this.load.image('helpIconHover', 'assets/img/helpIconHover.png')
    this.load.image('helpInfo', 'assets/img/helpInfo.png')
    this.load.image('combatFirst', 'assets/img/combatFirst.png')
    this.load.image('combatSec', 'assets/img/combatSec.png')
    
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

    this.anims.create({
      key: 'surgeon-idle',
      frames: this.anims.generateFrameNames('surgeon', {start: 1, end: 2, prefix: 'Surgeon Fish ', suffix: '.png'}),
      repeat: -1,
      frameRate: 5
    })
    
  }
}
