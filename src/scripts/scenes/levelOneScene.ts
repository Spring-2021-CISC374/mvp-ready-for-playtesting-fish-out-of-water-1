import { GameObjects } from "phaser";

export default class LevelOneScene extends Phaser.Scene {
  flounder: Phaser.Physics.Arcade.Sprite
  npc: Phaser.Physics.Arcade.Sprite
  music:Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'LevelOneScene' })
  }

  preload(){
	  this.music = this.sound.add('sewermusic', {loop: true, volume: 0.5});
	  this.music.play();
  }
  create() {
	//Background color
	this.cameras.main.setBackgroundColor("0x142702");
	//Create map from Tiled and add necessary collisions
	const map = this.make.tilemap({key: "sewer1"})
	const tileset = map.addTilesetImage('Pipes', 'pipes')
	//const background = map.createLayer('Background', tileset)
	const foreground = map.createLayer('Sewer', tileset)
	foreground.setCollisionByProperty({collides: true})

	//debug collisions
	const debugGraphics = this.add.graphics().setAlpha(0.7);
	foreground.renderDebug(debugGraphics, {
		tileColor: null,
		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		faceColor: new Phaser.Display.Color(40,39,37,255)
	})

	//Create fish
	this.flounder = this.physics.add.sprite(0,435,'flounder', 'Flounder 1.png').setScale(0.1)
	this.flounder.anims.play('flounder-idle')
	this.physics.add.collider(this.flounder, foreground)
	//Initialize cameras to follow fish
	this.cameras.main.startFollow(this.flounder,true)
	//Create npc
	this.npc = this.physics.add.sprite(300,435,'flounder', 'Flounder 1.png').setScale(0.1).setInteractive();
	this.npc.anims.play('flounder-idle')
	this.physics.add.collider(this.npc, foreground)
	this.npc.angle = 180;
	this.physics.add.collider(this.flounder, this.npc);
	this.physics.add.overlap(this.flounder, this.npc, this.process);
}

process(flounder, npc){
    flounder.setTint("0x142702");
}


  update(){
    var cursors = this.input.keyboard.createCursorKeys();
   	if (cursors.up.isDown) {
		this.flounder.y = this.flounder.y - 1.5;
		this.flounder.angle = 270;
	}
	if (cursors.down.isDown) {
		this.flounder.y = this.flounder.y + 1.5;
		this.flounder.angle = 90;
	}
	if (cursors.left.isDown) {
		this.flounder.x = this.flounder.x - 1.5;
		this.flounder.angle = 180;
	}
	if (cursors.right.isDown) {
		this.flounder.x = this.flounder.x + 1.5;
		this.flounder.angle = 0;
	}

  }
}
