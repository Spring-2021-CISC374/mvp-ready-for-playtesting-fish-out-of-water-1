import Enemy from "../objects/Enemy";
import PlayerCharacter from "../objects/PlayerCharacter";

export default class BattleScene extends Phaser.Scene {
    heroes: PlayerCharacter[];
    activeID: number;
    activeHero: any;
    enemies: Enemy[];
    units: any[];
    index: number;
    exitBattle: Function | undefined;

    constructor() {
        super({ key: "BattleScene" });
    }

    create() {
        // change the background to green
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        
        this.startBattle();

        this.sys.events.on('wake', this.wake, this);      
    }

    startBattle() {
        // player character - warrior
        var playerHealth = new HealthBar(this, 160, 0, 0xB5D99C);
        var enemyHealth = new HealthBar(this, 0,0,0xE65F5C);

        var fish = new PlayerCharacter(this, 250, 100, "combat-flounder", 1, "Fish", 100, 20);        
        this.add.existing(fish);

        // player character - mage
        var enemy = new Enemy(this, 50, 100, "enemy-jellyfish", 4, "Jelly", 100, 15); 
        this.add.existing(enemy);       

        var shark = new PlayerCharacter(this, 250, 100, "shift-orca", null, "Orca", 50, 40);

        var shrimp = new PlayerCharacter(this, 250, 100, "shift-shrimp", null,"Shrimp", 50, 5);

        // array with heroes
        this.heroes = [ fish, shark, shrimp ];
        this.activeID = 0;
        this.activeHero = this.heroes[this.activeID];
        // array with enemies
        this.enemies = [ enemy ];
        // array with both parties, who will attack
        this.units = [this.activeHero];
        this.units = this.units.concat(this.enemies);

        this.index = -1;      

        // Run UI Scene at the same time

        this.scene.launch("UIScene");
    }

    wake() {
        this.scene.run('UIScene');  
        this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});        
    }

    shapeShiftHero(index) {
        var tempHP = this.activeHero.getHP();
        var tempHero = this.activeHero;
        this.activeHero = this.heroes[index];
        this.activeHero.setHP(tempHP);
        this.updateUnits();
        this.activeHero.shapeShift(tempHero);
        tempHero.destroy();
        this.add.existing(this.activeHero);
        
    }

    updateUnits() {
        this.units[0] = this.activeHero;
    }

    nextTurn() {
        if(this.checkEndBattle()) {           
            this.endBattle();
            return;
        }

        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
            this.index = 0;
        }
        if(this.units[this.index]) {
            // if its player hero
            if(this.units[this.index] instanceof PlayerCharacter) {                
                this.events.emit("PlayerSelect", this.index);
            } else { // else if its enemy unit
                this.units[this.index].attack(this.activeHero);  
                // add timer for the next turn, so will have smooth gameplay
                this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
            }
        }
    }

    // when the player have selected the enemy to be attacked
    receivePlayerSelection(action, target) {
        if(action == "attack") {            
            this.units[this.index].attack(this.enemies[target]);   
        }
        else if (action == "shapeshift") {
            this.shapeShiftHero(target);
        }
        // next turn in 3 seconds
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    checkEndBattle() {        
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].alive)
                victory = false;
        }
        var loss = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].alive)
                loss = false;
        }
        return victory || loss;
    }

    endBattle() {       
        // clear state, remove sprites
        //this.scene.events.emit("Message", "Battle over!");
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();            
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
    }
}