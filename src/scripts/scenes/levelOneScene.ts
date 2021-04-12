export default class LevelOneScene extends Phaser.Scene {
	player: Phaser.Physics.Arcade.Sprite
	npc: Phaser.Physics.Arcade.Sprite
	music:Phaser.Sound.BaseSound;
	pipeScore = 0;
	//Map information
	map: Phaser.Tilemaps.Tilemap;
	background:Phaser.Tilemaps.TilemapLayer;
	tileset: Phaser.Tilemaps.Tileset;
	pipePieces;
	PipeLayer;
	CombatLayer;
	startpt;
	npcpt;
	combatpts;
	text;
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
	  this.map = this.make.tilemap({key: "sewerlevel1"})
	  this.tileset = this.map.addTilesetImage('Pipes', 'pipes')
	  this.background = this.map.createLayer('Sewer', this.tileset)
	  this.background.setCollisionByProperty({collides: true})
	  this.physics.world.setBoundsCollision()

	  //Setting object points
	  this.startpt = this.map.findObject("Points", obj => obj.name === "StartingPoint")
	  this.npcpt = this.map.findObject("Points", obj => obj.name === "NPCPoint")
	  this.PipeLayer = this.map.getObjectLayer('Pipe')['objects'];
	  this.CombatLayer = this.map.getObjectLayer('Combat')['objects'];
	
	//debug collisions
	//    const debugGraphics = this.add.graphics().setAlpha(0.7)
	//    this.background.renderDebug(debugGraphics, {
	// 	  tileColor: null,
	// 	  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
	//  	  faceColor: new Phaser.Display.Color(40,39,37,255)
	//    })
  
	//Create all images on the map
	this.player = this.physics.add.sprite(this.startpt.x,this.startpt.y,'clown').setScale(0.06)
	this.npc = this.physics.add.sprite(this.npcpt.x,this.npcpt.y,'flounder').setScale(0.06)
	this.pipePieces = this.physics.add.staticGroup()
	this.PipeLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "PipePiece").setScale(0.05);
		this.physics.add.overlap(this.player, image, () =>{
			image.destroy()
			this.pipeScore++
			this.text.setText(`Pipe Pieces found : ${this.pipeScore}`)
		})
	});
	this.combatpts = this.physics.add.staticGroup()
	this.CombatLayer.forEach(object => {
		this.physics.add.existing(object)
		this.physics.add.overlap(this.player, object, () =>{
			this.game.scene.start('BattleScene');
		})
	})
	  //Physics tasks
	  this.physics.world.enableBody(this.player)
	  this.add.existing(this.player);
	  this.npc.anims.play('flounder-idle')
	  this.player.anims.play('clown-idle')
	  this.physics.add.collider(this.player, this.background)
	  this.player.setCollideWorldBounds(true);
	  this.npc.angle = 180;
	  this.physics.add.collider(this.player, this.npc, () =>{
		  this.music.stop()
		  this.game.scene.start('LevelOneScene');
	  });
	  
	  //Initialize cameras to follow fish
	  //this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
	  this.cameras.main.startFollow(this.player,true)
	  this.cameras.main.zoom = 5;
  
	  

	  //score
	  this.text = this.add.text(this.game.canvas.width/2-60, this.game.canvas.height/2 - 60,`Pipe Pieces found : ${this.pipeScore}`).setScrollFactor(0).setFontSize(64).setColor('#ffffff').setFontSize(32).setScale(0.1);
	  this.text.fixedToCamera = true;
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
		this.player.setFrame( (prevDir * framesPerDirection));
	  }
	}
  }