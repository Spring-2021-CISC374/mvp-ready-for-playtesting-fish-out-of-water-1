import PlayerCharacter from "../objects/PlayerCharacter";

export default class PowerUpScene extends Phaser.Scene {
    constructor() {
        super({key: "PowerUpScene"});
    }

    create() {
        // load background image
        //this.cameras.main.("0x8B8BAE");
        this.add.image(0,0,'sewer-combat').setOrigin(0);

        var fish = new PlayerCharacter(this, 250, 250, "combat", null, "Fish", 100, 20, "fish");        
        this.add.existing(fish)
        fish.anims.play('combat-flounder');
 
        this.events.emit("Message", "Power up achieved! The final boss is weak!");
        this.time.addEvent({ delay: 3000 });  

        this.scene.sleep();
    }

}