export default class LevelOneScene extends Phaser.Scene {
  flounder: Phaser.Physics.Arcade.Sprite
  npc: Phaser.Physics.Arcade.Sprite
  music:Phaser.Sound.BaseSound;
  //Map information
  map: Phaser.Tilemaps.Tilemap;
  background:Phaser.Tilemaps.StaticTilemapLayer;
  colls:Phaser.Tilemaps.StaticTilemapLayer;
  tileset: Phaser.Tilemaps.Tileset;

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
	this.map = this.make.tilemap({key: "sewer1"})
	this.tileset = this.map.addTilesetImage('Pipes', 'pipes')
	this.background = this.map.createStaticLayer('Sewer', this.tileset).setDepth(-1)
	this.colls = this.map.createStaticLayer('Colls', this.tileset)
	this.colls.setCollisionByProperty({ collides: true });

	//debug collisions
	const debugGraphics = this.add.graphics().setAlpha(0.7)
	this.colls.renderDebug(debugGraphics, {
		tileColor: null,
		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		faceColor: new Phaser.Display.Color(40,39,37,255)
	})

	//Create fish + test npc
	this.flounder = this.physics.add.sprite(0,435,'flounder').setScale(0.1)
	this.npc = this.physics.add.sprite(100,435,'flounder').setScale(0.1)
	this.physics.world.enableBody(this.flounder)
	this.add.existing(this.flounder);
	this.npc.anims.play('flounder-idle')
	this.flounder.anims.play('flounder-idle')

	this.physics.add.collider(this.flounder, this.colls, this.process)
	this.flounder.setCollideWorldBounds(true);
	
	//Initialize cameras to follow fish
	this.cameras.main.startFollow(this.flounder,true)
	this.cameras.main.zoom = 3;

	//this.physics.add.collider(this.npc, foreground, this.process)
	this.npc.angle = 180;
	this.physics.add.collider(this.flounder, this.npc, this.process);
	
}

process(flounder,npc){
	flounder.setTint("0x142702");
}

update(){
    var cursors = this.input.keyboard.createCursorKeys();
   	if (cursors.up?.isDown) {
		this.flounder.y = this.flounder.y - 1.5;
		this.flounder.angle = 270;
	}
	if (cursors.down?.isDown) {
		this.flounder.y = this.flounder.y + 1.5;
		this.flounder.angle = 90;
	}
	if (cursors.left?.isDown) {
		this.flounder.x = this.flounder.x - 1.5;
		this.flounder.angle = 180;
	}
	if (cursors.right?.isDown) {
		this.flounder.x = this.flounder.x + 1.5;
		this.flounder.angle = 0;
	}
	this.physics.world.collide(this.flounder,this.colls)
  }
}
