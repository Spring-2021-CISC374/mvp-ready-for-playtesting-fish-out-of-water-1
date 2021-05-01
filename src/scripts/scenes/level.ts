
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
	text;
	delay
	//Map information
	minimap
	pressed:boolean
	map: Phaser.Tilemaps.Tilemap;
	color:Phaser.Tilemaps.TilemapLayer;
	background:Phaser.Tilemaps.TilemapLayer;
	insufficientLayer: Phaser.Tilemaps.TilemapLayer;
	sufficientLayer: Phaser.Tilemaps.TilemapLayer;
	tileset: Phaser.Tilemaps.Tileset;
	instructions: any
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
	helper1;
	helper2;
	helper3;
	helper4;
	helper5;
	clogpt;
	pipechecker;
	pipecheck;
	Question;
	clog;
	help: Phaser.GameObjects.Text;

	
	constructor(sceneKey:string, mapKey:string, nextSceneKey:string) {
	  super({ key: sceneKey })
	  this.sceneKey = sceneKey
	  this.mapKey = mapKey
	  this.nextSceneKey = nextSceneKey
	  this.pressed = false
	  this.delay = false
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
		//message box
		this.createMessageBox("")
	  	this.messageBox.setVisible(false)
	  	this.pipeMsg.setVisible(false)
		this.delay = true
	  //Create map from Tiled and add necessary collisions
	  this.map = this.make.tilemap({key: this.mapKey})
	  this.tileset = this.map.addTilesetImage('Pipes', 'pipes')
	  this.color = this.map.createLayer('Background', this.map.addTilesetImage('background', 'background')).setDepth(-5)
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
		this.insufficientLayer = this.map.createLayer('InsufficientPipes', this.tileset).setDepth(-1)
		this.clogpt = this.map.findObject("Clog", obj => obj.name === "Clog")
		this.pipechecker = this.map.findObject("PipeCheck", obj => obj.name === "PipeCheck")
		this.clog = this.physics.add.image(this.clogpt.x, this.clogpt.y,'clog').setScale(0.025)
		this.pipecheck = this.physics.add.image(this.pipechecker.x, this.pipechecker.y, 'transparent').setScale(0.05)
	  }
	  //Setting arrays of objects that contain position data
	  this.PipeLayer = this.map.getObjectLayer('Pipe')['objects'];
	  this.CombatLayer = this.map.getObjectLayer('Combat')['objects'];
	//Create all players on the map
	this.player = this.physics.add.sprite(this.startpt.x, this.startpt.y,'clown').setScale(0.06)
	this.npcptCollide = this.physics.add.sprite(this.npcpt.x,this.npcpt.y,'flounder').setScale(0.06).setBounce(0)
	this.npc1Collide = this.physics.add.sprite(this.npc1.x,this.npc1.y,'flounder').setScale(0.06).setBounce(0)
	this.npc2Collide = this.physics.add.sprite(this.npc2.x,this.npc2.y,'flounder').setScale(0.06).setBounce(0)
	//change later, to where they need/should be
	if(this.sceneKey == "LevelOneScene"){
	this.helper1 = this.physics.add.sprite(this.startpt.x + 20,this.startpt.y + 50,'flounder').setScale(0.06).setBounce(0)
	this.helper2 = this.physics.add.sprite(this.startpt.x + 40,this.startpt.y + 50,'flounder').setScale(0.06).setBounce(0)
	this.helper3 = this.physics.add.sprite(this.startpt.x + 60,this.startpt.y + 50,'flounder').setScale(0.06).setBounce(0)
	}
	if(this.sceneKey == "LevelTwoScene"){	
	this.helper4 = this.physics.add.sprite(this.startpt.x + 20,this.startpt.y + 50,'flounder').setScale(0.06).setBounce(0)
	this.helper5 = this.physics.add.sprite(this.startpt.x + 40,this.startpt.y + 50,'flounder').setScale(0.06).setBounce(0)
	}

	  //animations
	  this.npcptCollide.anims.play('flounder-idle')
	  this.player.anims.play('clown-idle')
	  this.npcptCollide.anims.play('flounder-idle')
	  this.npc1Collide.anims.play('flounder-idle')
	  this.npc2Collide.anims.play('flounder-idle')
	  //helper animations
	  if(this.sceneKey == "LevelOneScene"){
		this.helper1.anims.play('flounder-idle')
		this.helper2.anims.play('flounder-idle')
		this.helper3.anims.play('flounder-idle')
	  }
	  if(this.sceneKey == "LevelTwoScene"){
		this.helper4.anims.play('flounder-idle')
		this.helper5.anims.play('flounder-idle')
	  }
	  //physics collider
	  this.physics.add.collider(this.player, this.background)
	  this.player.setCollideWorldBounds(true);
	  this.npcptCollide.angle = 180;
	  this.physics.add.collider(this.player, this.clog, () =>{
		this.createMessageBox("			You found the clog, \n and saved Sewer-topia!")	
		this.clog.destroy()
	  })
	  this.physics.add.collider(this.player,this.pipecheck, () => {
		if(this.pipeScore > 3) {
			this.createMessageBox("You collected enough pipes \nto fix the broken pipes!")
			this.insufficientLayer.destroy()
			this.sufficientLayer = this.map.createLayer('SufficientPipes', this.tileset).setDepth(-1)
			this.sufficientLayer.setCollisionByProperty({collides: true})
			this.physics.add.collider(this.player, this.sufficientLayer)
		}
		else {
			this.createMessageBox("Sorry, you didn't collect enough \npipes to fix the break :(")
			this.insufficientLayer.setCollisionByProperty({collides: true})
			this.physics.add.collider(this.player, this.insufficientLayer)
		}
		this.pipecheck.destroy()
	  })
	this.bossLayer.forEach(object => {
		const image = this.physics.add.image(object.x, object.y, "transparent").setScale(0.05);
		this.physics.add.overlap(this.player, image, () =>{
			if(this.pipeScore > 3) {
				this.scene.switch('PipeScene')
			}
			else {
				   this.game.scene.start('BossBattleScene', {extraDamage: false, extraHealth: false, extraLife: false}) 
				   this.combatMusic.resume()
			}
			this.music.pause()
			this.bumpSound.play()
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
	  this.minimap = this.cameras.add(0, 0, 640, 640).setZoom(0.8)
	  this.minimap.scrollX = -20
	  this.minimap.scrollY = -20
	  this.minimap.setVisible(false)

	  //Add pipe and combat overlap 
	  this.PipeLayer.forEach(object => {
		var value = Phaser.Math.Between(1, 5);
		const image = this.physics.add.image(object.x, object.y, "pipe"+value).setScale(0.04);
		this.physics.add.overlap(this.player, image, () =>{
			image.destroy()
			this.pipeScore++
			this.text.setText(`Pipe Pieces found : ${this.pipeScore} \nPress M for map`)
			this.createMessageBox("\t\t\t\tYou found a pipe! \n Hmm... I wonder what it's for...")
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

	//helper overlap
	this.physics.add.overlap(this.player, this.helper1, () =>{
		this.helper1.destroy()
		this.createMessageBox("Helper 1!\nHmm... I wonder what it's for...\nI know you can save us!")
		this.destroyMessageBox
	})

	this.physics.add.overlap(this.player, this.helper2, () =>{
		this.helper2.destroy()
		this.createMessageBox("Helper 2!\nHmm... I wonder what it's for...\nGood luck friend!")
		this.destroyMessageBox
	})

	this.physics.add.overlap(this.player, this.helper3, () =>{
		this.helper3.destroy()
		this.createMessageBox("Helper 3!\nHmm... I wonder what it's for...\nPlease, help us!")
		this.destroyMessageBox
	})

	this.physics.add.overlap(this.player, this.helper4, () =>{
		this.helper4.destroy()
		this.createMessageBox("Helper 4!\nHmm... I wonder what it's for...\nGood luck friend!")
		this.destroyMessageBox
	})

	this.physics.add.overlap(this.player, this.helper5, () =>{
		this.helper5.destroy()
		this.createMessageBox("Helper 5!\nHmm... I wonder what it's for...\nI believe in you!")
		this.destroyMessageBox
	})

	  //score
	  this.text = this.add.text(this.game.canvas.width/2-60, this.game.canvas.height/2 - 60,`Pipe Pieces found : ${this.pipeScore} \nPress M for map`).setScrollFactor(0).setColor('#ffffff').setFontSize(32).setScale(0.1);
  }

  	onKeyInput(event) {
        if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.H) {
			this.instructions = this.scene.get("InstructionScene")
			this.instructions.setHostScene(this.sceneKey);
            this.scene.switch("InstructionScene");
        } 
	  }
  	createMessageBox(message){
    	this.messageBox = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, "messageBox").setScale(0.1).setScrollFactor(0)
		this.pipeMsg = this.add.text(this.game.canvas.width/2 -30 , this.game.canvas.height/2 -5, message, { font: "20px Arial", align: "left" }).setColor('#000000').setScale(0.2).setScrollFactor(0)
		if(this.delay) {
			this.time.addEvent({ delay: 2500, callback: this.destroyMessageBox, callbackScope: this });
			this.pauseMovement = true;
		}
   }
   mouseFix(){}
   destroyMessageBox(){
		this.pauseMovement = false;
    	this.pipeMsg.destroy();
    	this.messageBox.destroy();
		this.help.visible = false;
	  }
	  

	resetZoom(){
		this.cameras.main.zoom = 5;
		this.text.visible = true;
		this.help.visible = true;
	}

  update(){
	if (this.input.keyboard.addKey('M').isDown) {
		this.minimap.setVisible(true)
		this.text.setVisible(false)
		this.messageBox.setVisible(false)
		this.pipeMsg.setVisible(false)
		this.pressed = true
		this.pauseMovement = true;
	}
	if (this.input.keyboard.addKey('M').isUp) {
		if(this.pressed) {
			this.minimap.setVisible(false)
			this.text.setVisible(true)
			this.pauseMovement = false;
			this.pressed = false
		}
	}
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