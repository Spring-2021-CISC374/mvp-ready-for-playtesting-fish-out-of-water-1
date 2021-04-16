export default class Level extends Phaser.Scene {
	player: Phaser.Physics.Arcade.Sprite
	npcptCollide: Phaser.Physics.Arcade.Sprite
	npc1Collide: Phaser.Physics.Arcade.Sprite
	npc2Collide: Phaser.Physics.Arcade.Sprite
	music:Phaser.Sound.BaseSound;
	pipeScore = 0;
	pauseMovement = false;
	//Pop up message box 
	pipeMsg;
	messageBox;
	closeButton
	//Map information
	map: Phaser.Tilemaps.Tilemap;
	background:Phaser.Tilemaps.TilemapLayer;
	tileset: Phaser.Tilemaps.Tileset;
	mapKey
	sceneKey
	nextSceneKey
	PipeLayer;
	CombatLayer;
	RightSpawnLayer;
	WrongSpawnLayer;
	NPCLayer;
	startpt;
	npcpt;
	npc1;
	npc2;
	clogpt;
	pipechecker;
	text;
	Question;


	constructor(sceneKey:string, mapKey:string, nextSceneKey:string) {
	  super({ key: sceneKey })
	  this.sceneKey = sceneKey
	  this.mapKey = mapKey
	  this.nextSceneKey = nextSceneKey
	}
  
	preload(){
		this.music = this.sound.add('sewermusic', {loop: true, volume: 0.5});
		this.music.play();
	}
	
	create() {
	  //Background color
	  this.cameras.main.setBackgroundColor("0x142702");
	  //Create map from Tiled and add necessary collisions
	  this.map = this.make.tilemap({key: this.mapKey})
	  this.tileset = this.map.addTilesetImage('Pipes', 'pipes')
	  this.background = this.map.createLayer('Sewer', this.tileset)
	  this.background.setCollisionByProperty({collides: true})
	  this.physics.world.setBoundsCollision()

	  //Setting object points
	  this.startpt = this.map.findObject("Points", obj => obj.name === "StartingPoint")
	  this.npcpt = this.map.findObject("Points", obj => obj.name === "NPCPoint")
	  this.npc2 = this.map.findObject("NPC", obj => obj.name === "NPC2")
	  this.npc1 = this.map.findObject("NPC", obj => obj.name === "NPC1")

	  if(this.sceneKey == "LevelTwoScene") {
		this.clogpt = this.map.findObject("Clog", obj => obj.name === "Clog")
		this.pipechecker = this.map.findObject("PipeCheck", obj => obj.name === "PipeCheck")
	  }
	  //Setting arrays of objects that contain position data
	  this.PipeLayer = this.map.getObjectLayer('Pipe')['objects'];
	  this.CombatLayer = this.map.getObjectLayer('Combat')['objects'];
	  this.NPCLayer = this.map.getObjectLayer('NPC')['objects']; //Only two NPCs here (the final NPC for now is in the npcpt)
	  this.RightSpawnLayer = this.map.getObjectLayer('RightSpawn')['objects']; //Hopefully in order
	  this.WrongSpawnLayer = this.map.getObjectLayer('WrongSpawn')['objects']; //Hopefully in order
  
	//Create all players on the map
	this.player = this.physics.add.sprite(100, 450,'clown').setScale(0.06)
	this.npcptCollide = this.physics.add.sprite(this.npcpt.x,this.npcpt.y,'flounder').setScale(0.06)
	this.npc1Collide = this.physics.add.sprite(this.npc1.x,this.npc1.y,'flounder').setScale(0.06)
	this.npc2Collide = this.physics.add.sprite(this.npc2.x,this.npc2.y,'flounder').setScale(0.06)
	  //Physics tasks
	  this.physics.world.enableBody(this.player)
	  this.add.existing(this.player);
	  this.npcptCollide.anims.play('flounder-idle')
	  this.player.anims.play('clown-idle')
	  this.physics.add.collider(this.player, this.background)
	  this.player.setCollideWorldBounds(true);
	  this.npcptCollide.angle = 180;
	  this.physics.add.collider(this.player, this.npcptCollide, () =>{
		  this.music.stop()
		  this.Question = 1;
		  this.game.scene.start('QuestionScene1');
		  this.scene.pause(this.sceneKey)
	  });
	  this.physics.add.collider(this.player, this.npc1Collide, () =>{
		this.music.stop()	
		this.Question = 2;	
		if(this.sceneKey == "LevelTwoScene"){
			this.Question+=2;
			this.game.scene.start('QuestionScene4');
		}
		else{
			this.game.scene.start('QuestionScene2');
		}
		this.scene.pause(this.sceneKey)
	});
	this.physics.add.collider(this.player, this.npc2Collide, () =>{
		this.music.stop()
		this.Question = 3;		
		if(this.sceneKey == "LevelTwoScene"){
			this.Question+=2;
			this.game.scene.start('QuestionScene5');
		}
		else{
			this.game.scene.start('QuestionScene3');
		}
		this.scene.pause(this.sceneKey)
	});
	  
	  //Initialize cameras to follow fish
	  this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
	  this.cameras.main.startFollow(this.player,true)
	  //this.cameras.main.zoom = 5;
  
	  //Add pipe and combat overlap 
	  this.PipeLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "PipePiece").setScale(0.05);
		this.physics.add.overlap(this.player, image, () =>{
			image.destroy()
			this.pipeScore++
			this.text.setText(`Pipe Pieces found : ${this.pipeScore}`)
			this.createMessageBox()
		})
	});
	this.CombatLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "transparent").setScale(0.05);
		this.physics.add.existing(image)
		this.physics.add.overlap(this.player, image, () =>{
			this.music.stop()
			//this.scene.launch("BattleScene")
			//this.scene.pause(this.sceneKey) //these lines i think pause the current scene and can launch battlescene
			if(this.nextSceneKey != '')
				this.scene.start(this.nextSceneKey); // use this to launch the next scene
				//need an else here (maybe start over game)
			image.destroy()
		})
	})

	  //score
	  this.text = this.add.text(this.game.canvas.width/2-60, this.game.canvas.height/2 - 60,`Pipe Pieces found : ${this.pipeScore}`).setScrollFactor(0).setColor('#ffffff').setFontSize(32).setScale(0.1);
  }
  	createMessageBox(){
    	this.messageBox = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, "messageBox").setScale(0.1).setScrollFactor(0)
    	this.closeButton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2 + 5, "closeButton").setScale(0.1).setScrollFactor(0)
		this.pipeMsg = this.add.text(this.game.canvas.width/2 -25 , this.game.canvas.height/2 - 10, "			You found a pipe piece! \n Hmm... I wonder what it's for...", { font: "20px Arial", align: "left" }).setColor('#000000').setScale(0.2).setScrollFactor(0)
		this.closeButton.setInteractive();
    	this.closeButton.on('pointerdown', this.destroyMessageBox, this);
    	this.closeButton.on('pointerup', this.mouseFix, this);
		this.closeButton.on('pointerout', this.mouseFix, this);
		this.pauseMovement = true;
   }
   mouseFix(){}
   destroyMessageBox(){
		this.pauseMovement = false;
    	this.pipeMsg.destroy();
    	this.messageBox.destroy();
    	this.closeButton.destroy();
  	}

  update(){
	  if (this.registry.get("Question") == 1){
		  this.QuestionOne()
		  this.registry.set("Question", 0)
	  }
	  if (this.registry.get("Question") == 2){
		this.QuestionTwo()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 3){
		this.QuestionThree()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 4){
		this.QuestionFour()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 5){
		this.QuestionFive()
		this.registry.set("Question", 0)
	}
	this.npc1Collide.setVelocity(0,0);
	this.npc2Collide.setVelocity(0,0);
	this.npcptCollide.setVelocity(0,0);
	var velocityX = 125; 
    var velocityY = 125
	var prevDir = 0;
	let framesPerDirection:number = 3;
	this.player.setVelocity(0,0);
	  var cursors = this.input.keyboard.createCursorKeys();
	  if(this.pauseMovement){
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

	QuestionOne(){
		if (this.registry.get("A1") == 'A'){
			this.player.x = 200;
			this.registry.set("A1", "Done")
		}
		if (this.registry.get("A1") == 'B' || this.registry.get("A1") == 'C' || this.registry.get("A1") == 'D'){
  
		}
	}

	QuestionTwo(){
		if (this.registry.get("B1") == 'A'){
			this.player.x = 0;
			this.registry.set("B1", "Done")
		}
		if (this.registry.get("B1") == 'B' || this.registry.get("B1") == 'C' || this.registry.get("B1") == 'D'){
  
		}
	}

	QuestionThree(){
		if (this.registry.get("C1") == 'A'){
			this.player.x = 0;
			this.registry.set("C1", "Done")
		}
		if (this.registry.get("C1") == 'B' || this.registry.get("C1") == 'C' || this.registry.get("C1") == 'D'){
  
		}
		
	}

	QuestionFour(){
		if (this.registry.get("D1") == 'A'){
			this.player.x = 0;
			this.registry.set("D1", "Done")
		}
		if (this.registry.get("D1") == 'B' || this.registry.get("D1") == 'C' || this.registry.get("D1") == 'D'){
  
		}
		
	}

	QuestionFive(){
		if (this.registry.get("E1") == 'A'){
			this.player.x = 0;
			this.registry.set("E1", "Done")
		}
		if (this.registry.get("E1") == 'B' || this.registry.get("E1") == 'C' || this.registry.get("E1") == 'D'){
  
		}
		
	}
  }