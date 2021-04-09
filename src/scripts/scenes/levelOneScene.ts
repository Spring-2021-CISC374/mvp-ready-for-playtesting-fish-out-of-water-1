export default class LevelOneScene extends Phaser.Scene {
	flounder: Phaser.Physics.Arcade.Sprite
	npc: Phaser.Physics.Arcade.Sprite
	music:Phaser.Sound.BaseSound;
	//Map information
	map: Phaser.Tilemaps.Tilemap;
	background:Phaser.Tilemaps.TilemapLayer;
	colls:Phaser.Tilemaps.TilemapLayer;
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
	  this.colls = this.map.createLayer('Colls', this.tileset)
	  this.background = this.map.createLayer('Sewer', this.tileset)
	  this.colls.setCollisionByProperty({collides: true})
  
	  //debug collisions
	  const debugGraphics = this.add.graphics().setAlpha(0.7)
	  this.colls.renderDebug(debugGraphics, {
		  tileColor: null,
		  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		  faceColor: new Phaser.Display.Color(40,39,37,255)
	  })
  
	  //Create fish + test npc
	  this.flounder = this.physics.add.sprite(0,435,'flounder').setScale(0.08)
	  this.npc = this.physics.add.sprite(100,435,'flounder').setScale(0.08)
	  this.physics.world.enableBody(this.flounder)
	  this.add.existing(this.flounder);
	  this.npc.anims.play('flounder-idle')
	  this.flounder.anims.play('flounder-idle')
  
	  this.physics.add.collider(this.flounder, this.colls)
	  this.flounder.setCollideWorldBounds(true);
	  
	  //Initialize cameras to follow fish
	  this.cameras.main.startFollow(this.flounder,true)
	  this.cameras.main.zoom = 3;
  
	  //this.physics.add.collider(this.npc, foreground, this.process)
	  this.npc.angle = 180;
	  this.physics.add.collider(this.flounder, this.npc);
	  
  }

  update(){
	var velocityX = 125; // 100
    var velocityY = 125
	var prevDir = 0;
	let framesPerDirection:number = 3;
	var pauseMovement = false;
	this.flounder.setVelocity(0,0);
	  var cursors = this.input.keyboard.createCursorKeys();
	  if(pauseMovement){
		return;
	  }
	 if (cursors.up.isDown) {
          this.flounder.setVelocityY(-velocityY);
		  this.flounder.angle = 270;
		  prevDir = 3;
	  }
	  else if (cursors.down.isDown) {
		this.flounder.setVelocityY(velocityY);
		this.flounder.angle = 90;
		prevDir = 0;
	  }
	  else if (cursors.left.isDown) {
		this.flounder.setVelocityX(-velocityX);
		this.flounder.angle = 180;
		prevDir = 1;
	  }
	  else if (cursors.right.isDown) {
		this.flounder.setVelocityX(velocityX);
		this.flounder.angle = 0;
		prevDir = 2;
	  }
	  else{
		this.flounder.setVelocity(0,0);
		this.flounder.setFrame(1 + (prevDir * framesPerDirection));
	  }
	  this.physics.world.collide(this.flounder,this.colls)
	}
  }