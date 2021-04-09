export default class LevelOneScene extends Phaser.Scene {
	player: Phaser.Physics.Arcade.Sprite
	npc: Phaser.Physics.Arcade.Sprite
	music:Phaser.Sound.BaseSound;
	//Map information
	map: Phaser.Tilemaps.Tilemap;
	background:Phaser.Tilemaps.TilemapLayer;
	colls:Phaser.Tilemaps.TilemapLayer;
	tileset: Phaser.Tilemaps.Tileset;
	npcTalk: Phaser.GameObjects.Text;
	inputElement: Phaser.GameObjects.DOMElement
  	dir_msg: Phaser.GameObjects.Text;
  	pl_model_key: string;
	pause: boolean;
	
  
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
	  this.player = this.physics.add.sprite(0,435,'flounder').setScale(0.08)
	  this.npc = this.physics.add.sprite(100,435,'flounder').setScale(0.08)
	  this.physics.world.enableBody(this.player)
	  this.add.existing(this.player);
	  this.npc.anims.play('flounder-idle')
	  this.player.anims.play('flounder-idle')
  
	  this.physics.add.collider(this.player, this.colls)
	  this.player.setCollideWorldBounds(true);
	  
	  //Initialize cameras to follow fish
	  this.cameras.main.startFollow(this.player,true)
	  this.cameras.main.zoom = 3;
  
	  //this.physics.add.collider(this.npc, foreground, this.process)
	  this.npc.angle = 180;
	  this.physics.add.collider(this.player, this.npc, this.process);

	  
  }

  //Where the collision between npc and flounder(player) take place
  process(flounder, npc){ 
	//proof of collision
	npc.setTint("0x142702");
  }

  update(){
	this.npc.setVelocity(0,0);
	var velocityX = 125; 
    var velocityY = 125
	var prevDir = 0;
	let framesPerDirection:number = 3;
	var pauseMovement = false;
	this.player.setVelocity(0,0);
	  var cursors = this.input.keyboard.createCursorKeys();
	  if(pauseMovement){
		return;
	  }
	 if (cursors.up.isDown) {
          this.player.setVelocityY(-velocityY);
		  this.player.angle = 270;
		  prevDir = 3;
	  }
	  else if (cursors.down.isDown) {
		this.player.setVelocityY(velocityY);
		this.player.angle = 90;
		prevDir = 0;
	  }
	  else if (cursors.left.isDown) {
		this.player.setVelocityX(-velocityX);
		this.player.angle = 180;
		prevDir = 1;
	  }
	  else if (cursors.right.isDown) {
		this.player.setVelocityX(velocityX);
		this.player.angle = 0;
		prevDir = 2;
	  }
	  else{
		this.player.setVelocity(0,0);
		this.player.setFrame(1 + (prevDir * framesPerDirection));
	  }
	  this.physics.world.collide(this.player,this.colls)
	}
  }