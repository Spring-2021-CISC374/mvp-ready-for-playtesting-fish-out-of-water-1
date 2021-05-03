import Message from "../objects/Message";

export default class PipeScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite
    combatMusic:Phaser.Sound.BaseSound;
    extraLife: boolean
    extraDamage: boolean
    extraHealth: boolean
    question
    boost
    message:Message
    pauseMovement;

    constructor() {
        super({ key: 'PipeScene' })
        this.extraLife = false
        this.extraDamage = false
        this.extraHealth = false
        this.pauseMovement = true
    }
    create() {
        this.combatMusic = this.sound.add('combatmusic', {loop: true, volume: 0.5});
        this.combatMusic.play();
		this.combatMusic.pause();
        this.add.image(0,0,'sewer-combat').setOrigin(0);
        this.question = this.physics.add.image(550,300,'questionBox').setScale(0.2)
        this.player = this.physics.add.sprite(50, 300,'clown').setScale(0.5)
        this.player.anims.play('clown-idle')
        this.message = new Message(this, this.events);
        this.add.existing(this.message);   
        this.message.showMessage("You fixed the broken pipes and found a secret room!")
        this.time.addEvent({ delay: 2500, callback: this.nextMessage, callbackScope: this });
        this.physics.add.overlap(this.player, this.question, () =>{
            var value = Phaser.Math.Between(1, 3);
            this.question.destroy()
            if(value <= 1) {
                this.boost = this.physics.add.image(550,300,'extraLife').setScale(0.15)
                this.message.showMessage("Yay an Extra Life! Now you have two chances to beat the boss!")
                this.extraLife = true
            }
            else if(value <= 2) {
                this.boost = this.physics.add.image(550,300,'extraDamage').setScale(0.2)
                this.message.showMessage("Yay Extra Damage! Now your attacks will be more powerful!")
                this.extraDamage = true
            }
            else {
                this.boost = this.physics.add.image(550,300,'extraHealth').setScale(0.35)
                this.message.showMessage("Yay an HP Boost! Now you'll have extra health!")
                this.extraHealth = true
            }
            this.time.addEvent({ delay: 2500, callback: this.nextScene, callbackScope: this });
            this.combatMusic.resume()
            console.log(value)
            
        })
    }
    nextScene() {
        //this.player.destroy();
        //this.boost.destroy();
        this.scene.sleep();
        this.game.scene.start('BossBattleScene', {extraDamage: this.extraDamage, extraHealth: this.extraHealth, extraLife: this.extraLife})
    }
    nextMessage() {
        this.message.showMessage("Let's find out what powerup you'll get to fight the boss")
        this.pauseMovement = false
    }
    update() {
        var velocityX = 200; 
        var velocityY = 200
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
}
