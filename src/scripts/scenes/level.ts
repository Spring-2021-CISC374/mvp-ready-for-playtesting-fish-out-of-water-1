export default class Level extends Phaser.Scene {
	player: Phaser.Physics.Arcade.Sprite
	npcptCollide: Phaser.Physics.Arcade.Sprite
	npc1Collide: Phaser.Physics.Arcade.Sprite
	npc2Collide: Phaser.Physics.Arcade.Sprite
	music:Phaser.Sound.BaseSound;
	questionMusic:Phaser.Sound.BaseSound;
	combatMusic:Phaser.Sound.BaseSound;
	bumpSound:Phaser.Sound.BaseSound;
	pipeScore = 0;
	pauseMovement = false;
	//Pop up message box 
	pipeMsg;
	messageBox;
	closeButton;
	text;
	//Map information
	map: Phaser.Tilemaps.Tilemap;
	background:Phaser.Tilemaps.TilemapLayer;
	insufficientLayer: Phaser.Tilemaps.TilemapLayer;
	sufficientLayer: Phaser.Tilemaps.TilemapLayer;
	tileset: Phaser.Tilemaps.Tileset;
	mapKey
	sceneKey
	nextSceneKey
	PipeLayer;
	CombatLayer;
	bossLayer;
	startpt;
	npcpt;
	npc1;
	npc2;
	clogpt;
	pipechecker;
	Question;
	clog;
	
	constructor(sceneKey:string, mapKey:string, nextSceneKey:string) {
	  super({ key: sceneKey })
	  this.sceneKey = sceneKey
	  this.mapKey = mapKey
	  this.nextSceneKey = nextSceneKey
	}
  
	preload(){
		this.music = this.sound.add('sewermusic', {loop: true, volume: 0.5});
		this.questionMusic = this.sound.add('questionmusic', {loop: true, volume: 0.5});
		this.combatMusic = this.sound.add('combatmusic', {loop: true, volume: 0.5});
		this.bumpSound = this.sound.add('bumpsound', {loop: false, volume: 0.5});

	}
	
	create() {
		//music
		this.music.play();
		this.questionMusic.play();
		this.questionMusic.pause();
		this.combatMusic.play();
		this.combatMusic.pause();
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
	  this.bossLayer = this.map.getObjectLayer('Boss')['objects'];

	  if(this.sceneKey == "LevelTwoScene") {
		this.clogpt = this.map.findObject("Clog", obj => obj.name === "Clog")
		this.pipechecker = this.map.findObject("PipeCheck", obj => obj.name === "PipeCheck")
		this.clog = this.physics.add.image(this.clogpt.x, this.clogpt.y,'clog').setScale(0.025)
	  }
	  //Setting arrays of objects that contain position data
	  this.PipeLayer = this.map.getObjectLayer('Pipe')['objects'];
	  this.CombatLayer = this.map.getObjectLayer('Combat')['objects'];
	//Create all players on the map
	this.player = this.physics.add.sprite(this.startpt.x, this.startpt.y,'clown').setScale(0.06)
	this.npcptCollide = this.physics.add.sprite(this.npcpt.x,this.npcpt.y,'flounder').setScale(0.06).setBounce(0)
	this.npc1Collide = this.physics.add.sprite(this.npc1.x,this.npc1.y,'flounder').setScale(0.06).setBounce(0)
	this.npc2Collide = this.physics.add.sprite(this.npc2.x,this.npc2.y,'flounder').setScale(0.06).setBounce(0)
	  //animations
	  this.npcptCollide.anims.play('flounder-idle')
	  this.player.anims.play('clown-idle')
	  this.npcptCollide.anims.play('flounder-idle')
	  this.npc1Collide.anims.play('flounder-idle')
	  this.npc2Collide.anims.play('flounder-idle')
	  //physics collider
	  this.physics.add.collider(this.player, this.background)
	  this.player.setCollideWorldBounds(true);
	  this.npcptCollide.angle = 180;
	  this.physics.add.collider(this.player, this.clog, () =>{
		this.createMessageBox("			You found the clog, \n and saved Sewer-topia!")
		if(this.pipeScore > 3) {
			this.sufficientLayer = this.map.createLayer('SufficientPipes', this.tileset).setDepth(-1)
			this.sufficientLayer.setCollisionByProperty({collides: true})
			this.physics.add.collider(this.player, this.sufficientLayer)
		}
		else {
			this.insufficientLayer = this.map.createLayer('InsufficientPipes', this.tileset).setDepth(-1)
			this.insufficientLayer.setCollisionByProperty({collides: true})
			this.physics.add.collider(this.player, this.insufficientLayer)
		}
		this.clog.destroy()
	  })
	this.bossLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "transparent").setScale(0.05);
		this.physics.add.overlap(this.player, image, () =>{
   			this.scene.switch('BossBattleScene') 
			   this.music.pause()
			   this.bumpSound.play()
			   this.combatMusic.resume()
		})
	});
	  this.physics.add.collider(this.player, this.npcptCollide, () =>{
		  this.music.pause()
		  this.bumpSound.play();
		  this.questionMusic.resume();
		  this.pauseMovement = true;
		  this.Question = 1;
		  if(this.sceneKey == "LevelTwoScene"){
			  this.Question+=2;
			  this.game.scene.start('QuestionScene6')
		  }
		  else{
			this.game.scene.start('QuestionScene1');
		  }
	  })
	  this.physics.add.collider(this.player, this.npc1Collide, () =>{
		this.music.pause()	
		this.bumpSound.play();
		this.questionMusic.resume();
		this.pauseMovement = true;
		this.Question = 2;	
		if(this.sceneKey == "LevelTwoScene"){
			this.Question+=2;
			this.game.scene.start('QuestionScene4');
		}
		else{
			this.game.scene.start('QuestionScene2');
		}
	})
	this.physics.add.collider(this.player, this.npc2Collide, () =>{
		this.music.pause()
		this.bumpSound.play();
		this.questionMusic.resume();
		this.pauseMovement = true;
		this.Question = 3;		
		if(this.sceneKey == "LevelTwoScene"){
			this.Question+=2;
			this.game.scene.start('QuestionScene5');
		}
		else{
			this.game.scene.start('QuestionScene3');
		}
	});
	  
	  //Initialize cameras to follow fish
	  this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
	  this.cameras.main.startFollow(this.player,true)
	  this.cameras.main.zoom = 5;
  
	  //Add pipe and combat overlap 
	  this.PipeLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "PipePiece").setScale(0.05);
		this.physics.add.overlap(this.player, image, () =>{
			image.destroy()
			this.pipeScore++
			this.text.setText(`Pipe Pieces found : ${this.pipeScore}`)
			this.createMessageBox("			You found a pipe piece! \n Hmm... I wonder what it's for...")
			})
		});

	// switching scenes to combat
	this.CombatLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "transparent").setScale(0.05);
		this.physics.add.existing(image)
		this.physics.add.overlap(this.player, image, () =>{
		this.music.pause()
		this.bumpSound.play()
		this.combatMusic.resume()
			//this.scene.pause(this.sceneKey)
			//this.scene.launch("BattleScene")
			this.scene.switch('BattleScene');
			image.destroy()
		})
	})

	  //score
	  this.text = this.add.text(this.game.canvas.width/2-60, this.game.canvas.height/2 - 60,`Pipe Pieces found : ${this.pipeScore}`).setScrollFactor(0).setColor('#ffffff').setFontSize(32).setScale(0.1);
  }
  	createMessageBox(message){
    	this.messageBox = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, "messageBox").setScale(0.1).setScrollFactor(0)
    	this.closeButton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2 + 5, "closeButton").setScale(0.1).setScrollFactor(0)
		this.pipeMsg = this.add.text(this.game.canvas.width/2 -30 , this.game.canvas.height/2 - 10, message, { font: "20px Arial", align: "left" }).setColor('#000000').setScale(0.2).setScrollFactor(0)
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
	if (this.registry.get("Battle") == 1){
		this.combatMusic.pause();
		  this.music.resume()
		  this.registry.set("Battle", 0)
	  }
	  if (this.registry.get("Question") == 1){
		this.questionMusic.pause();
		  this.music.resume()
		  this.pauseMovement = false;
		  this.QuestionOne()
		  this.registry.set("Question", 0)
	  }
	  if (this.registry.get("Question") == 2){
		this.questionMusic.pause();
		this.music.resume()
		this.pauseMovement = false;
		this.QuestionTwo()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 3){
		this.questionMusic.pause();
		this.music.resume()
		this.pauseMovement = false;
		this.QuestionThree()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 4){
		this.questionMusic.pause();
		this.music.resume()
		this.pauseMovement = false;
		this.QuestionFour()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 5){
		this.questionMusic.pause();
		this.music.resume()
		this.pauseMovement = false;
		this.QuestionFive()
		this.registry.set("Question", 0)
	}
	if (this.registry.get("Question") == 6){
		this.questionMusic.pause();
		this.music.resume()
		this.pauseMovement = false;
		this.QuestionSix()
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
		this.player.flipY = true;
		prevDir = 1;
	  }
	  else if (cursors.right.isDown) {
		this.player.setVelocityX(velocityX);
		this.player.angle = 0;
		this.player.flipY = false;
		prevDir = 2;
	  }
	  else{
		this.player.setVelocity(0,0);
		this.player.setFrame( (prevDir * framesPerDirection));
	  }
	}

	width: number = 0; 

	//npc1 (I know I know Im sorry)
	QuestionTwo(){
		if (this.registry.get("B1") == 'D'){
			//right answer
			this.player.x = 415
			this.player.y = 580
			this.registry.set("B1", "Done")
			this.createMessageBox("*Gasp!* You have been teleported! \n Good job! Right answer!")

			//var width = 0;
			var elem = document.getElementById('pmeterBar');

			if (this.width < 0) {
				this.width = 0;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById("pmeterBar");
				var p = 17;
				this.width = this.width - p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
		}
	
		if (this.registry.get("B1") == 'B' || this.registry.get("B1") == 'C' || this.registry.get("B1") == 'A'){
			//wrong answer
			this.player.x = 50
			this.player.y = 110
			this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width >= 100) {
				this.width = 100;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById('pmeterBar');
				var p = 17;
				this.width = this.width + p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
		}
	}

	//npc2
	QuestionThree(){
		if (this.registry.get("C1") == 'B'){
			//right answer
			this.player.x = 220
			this.player.y = 245
			this.registry.set("C1", "Done")
			this.createMessageBox("*Gasp!* You have been teleported! \n Good job! Right answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width < 0) {
				this.width = 0;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById("pmeterBar");
				var p = 17;
				this.width = this.width - p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
		}
		if (this.registry.get("C1") == 'A' || this.registry.get("C1") == 'C' || this.registry.get("C1") == 'D'){
			//wrong answer
			this.player.x = 625
			this.player.y = 325
			this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width >= 100) {
				this.width = 100;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById('pmeterBar');
				var p = 17;
				this.width = this.width + p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}

			}
		}
		
	}

		//npc 3
		QuestionOne(){
			if (this.registry.get("A1") == 'A'){
				//right answer
				if(this.nextSceneKey != '')
					this.scene.start(this.nextSceneKey, {pipeScore: this.pipeScore}); // use this to launch the next scene
					this.music.destroy()
				this.registry.set("A1", "Done")
				this.createMessageBox("*Gasp!* You have been teleported! \n Good job! Right answer!")

				//var width = 0;
				var elem = document.getElementById("pmeterBar");

				if (this.width < 0) {
					this.width = 0;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
				
				else {
					var elem = document.getElementById("pmeterBar");
					var p = 17;
					this.width = this.width - p;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			}
			if (this.registry.get("A1") == 'B' || this.registry.get("A1") == 'C' || this.registry.get("A1") == 'D'){
				//wrong answer				
				this.player.x = 220
				this.player.y = 275
				this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

				//var width = 0;
				var elem = document.getElementById("pmeterBar");

				if (this.width >= 100) {
					this.width = 100;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			
				else {
					var elem = document.getElementById('pmeterBar');
					var p = 17;
					this.width = this.width + p;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			}
		}

	//npc 1
	QuestionFour(){
		if (this.registry.get("D1") == 'D'){
			//right answer
			this.player.x = 335
			this.player.y = 630
			this.registry.set("D1", "Done")
			this.createMessageBox("*Gasp!* You have been teleported! \n Good job! Right answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width < 0) {
				this.width = 0;
				if (elem != null) {
				elem.style.width = this.width + "%";
				elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById("pmeterBar");
				var p = 17;
				this.width = this.width - p;
				if (elem != null) {
				elem.style.width = this.width + "%";
				elem.innerHTML = this.width + "%";
				}
			}
		}
		if (this.registry.get("D1") == 'B' || this.registry.get("D1") == 'C' || this.registry.get("D1") == 'A'){
			//wrong answer
			this.player.x = 295
			this.player.y = 630
			this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width >= 100) {
				this.width = 100;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById('pmeterBar');
				var p = 17;
				this.width = this.width + p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
		}
	}

	//npc 2
	QuestionFive(){
		if (this.registry.get("E1") == 'B'){
			//right answer
			this.player.x = 290
			this.player.y = 195
			this.registry.set("E1", "Done")
			this.createMessageBox("*Gasp!* You have been teleported! \n Good job! Right answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width < 0) {
				this.width = 0;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById("pmeterBar");
				var p = 17;
				this.width = this.width - p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
		}
		if (this.registry.get("E1") == 'A' || this.registry.get("E1") == 'C' || this.registry.get("E1") == 'D'){
			//wrong answer		
			this.player.x = 180
			this.player.y = 170
			this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

			//var width = 0;
			var elem = document.getElementById("pmeterBar");

			if (this.width >= 100) {
				this.width = 100;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
			
			else {
				var elem = document.getElementById('pmeterBar');
				var p = 17;
				this.width = this.width + p;
				if (elem != null) {
					elem.style.width = this.width + "%";
					elem.innerHTML = this.width + "%";
				}
			}
		}
	}
		//npc 3 (last, if right go to boss or end or whatever)
		QuestionSix(){
			if (this.registry.get("F1") == 'A'){
				//right answer
				if(this.nextSceneKey != '')
					this.registry.set("F1", "Done")
				else {
					this.npcptCollide.setActive(false).setVisible(false)
					this.npcptCollide.body.enable = false;
				}

				//var width = 0;
				var elem = document.getElementById("pmeterBar");

				if (this.width < 0) {
					this.width = 0;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
				
				else {
					var elem = document.getElementById("pmeterBar");
					var p = 17;
					this.width = this.width - p;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			}
			if (this.registry.get("F1") == 'B' || this.registry.get("F1") == 'C' || this.registry.get("F1") == 'D'){
				//wrong answer				
				this.player.x = 370
				this.player.y = 560
				this.createMessageBox("You've been teleported... but where? \n Sorry! Wrong answer!")

				//var width = 0;
				var elem = document.getElementById("pmeterBar");

				if (this.width >= 100) {
					this.width = 100;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			
				else {
					var elem = document.getElementById('pmeterBar');
					var p = 17;
					this.width = this.width + p;
					if (elem != null) {
						elem.style.width = this.width + "%";
						elem.innerHTML = this.width + "%";
					}
				}
			}
		}

		getPipeScore() {
			return this.pipeScore;
		}

  }