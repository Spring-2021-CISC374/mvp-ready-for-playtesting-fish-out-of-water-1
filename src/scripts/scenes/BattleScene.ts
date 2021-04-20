import { Physics } from "phaser";
import Enemy from "../objects/Enemy";
import HealthBar from "../objects/HealthBar";
//import HealthBar from "../objects/HealthBar";
import PlayerCharacter from "../objects/PlayerCharacter";
import Unit from "../objects/Unit";

export default class BattleScene extends Phaser.Scene {
    heroes: Unit[];
    activeID: number;
    activeHero: Unit;
    activeHeroHP: number;
    activeEnemy: Unit;
    enemies: Unit[];
    units: any[];
    index: number;
    exitBattle: Function | undefined;
    victory: boolean;
    surrenderFlag: boolean;
    playerHealth: HealthBar;
    enemyHealth: HealthBar;
    isFinalBoss: boolean;
    setEnemies: Enemy[];
    timesInCombat: number;

    constructor() {
        super({ key: "BattleScene" });
    }

    create() {
        // load background image
        //this.cameras.main.("0x8B8BAE");
        this.add.image(0,0,'sewer-combat').setOrigin(0);

        this.sys.events.on('wake', this.wake, this);   
        
        this.startBattle();   
    }

    startBattle() {

        let height = this.game.config.height as number;
        let width = this.game.config.width as number;

        let fightHeight = height/2 - 50;
        let fightPos1 = width * .8;
        let fightPos2 = width * .2;

        this.victory = false;
        this.surrenderFlag = false;

        // main combat character
        var fish = new PlayerCharacter(this, fightPos1, fightHeight, "combat", null, "Fish", 100, 20, "fish");        
        this.add.existing(fish)
        fish.anims.play('combat-flounder');

        // enemy options
        var enemy = new Enemy(this, fightPos2, fightHeight, "enemy-jellyfish", null, "Jelly", 100, 15, "jellyfish"); 

        var orca = new PlayerCharacter(this, fightPos1, fightHeight, "shift-orca", null, "Orca", 50, 40, "orca");
        this.add.existing(orca)
        orca.visible = false;

        var shrimp = new PlayerCharacter(this, fightPos1, fightHeight, "shift-shrimp", null,"Shrimp", 50, 5, "shrimp");
        this.add.existing(shrimp)
        shrimp.visible = false;

        // array with heroes
        this.heroes = [ fish, orca, shrimp ];
        this.isFinalBoss = false;
        this.activeID = 0;
        this.activeHero = this.heroes[this.activeID];
        this.activeHeroHP = this.activeHero.getHP();
        // array with enemies
        this.activeEnemy = enemy;
        this.add.existing(this.activeEnemy);
        this.activeEnemy.anims.play('enemy-jellyfish');
        this.enemies = [ this.activeEnemy ];
        // array with both parties, who will attack
        this.units = [this.activeHero];
        this.units = this.units.concat(this.enemies);
        this.timesInCombat = 1;
        
        this.playerHealth = new HealthBar(this, fightPos1, fish.y - 100, this.activeHero);
        this.enemyHealth = new HealthBar(this, fightPos2, this.activeEnemy.y - 100, this.activeEnemy);

        this.index = -1;      

        // Run UI Scene at the same time

        this.scene.launch("UIScene");
    }

    wake() {
        this.scene.run('UIScene'); 
        this.activeID = 0;
        this.activeHero = this.heroes[this.activeID];
        this.activeHero.visible = true;
        this.activeEnemy.visible = true;
        this.activeEnemy = this.enemies[0];
        this.victory = false;
        this.surrenderFlag = false;
        this.timesInCombat++;

        // reset HP
        for(var i = 0; i < this.units.length; i++) {
            this.units[i].setHP(this.units[i].getMaxHP());            
        }       
    }

    // randomizing enemy; instance in startBattle and wake
    /*decideEnemy() {
        var enemyIndex = 0;


        return enemyPick;
    }*/

    shapeShiftHero(index) {
        var tempHP = this.activeHero.getHP();
        var tempHero = this.activeHero;
        this.activeID = index;
        this.heroes[this.activeID].setHP(tempHP);
        this.activeHero = this.heroes[this.activeID];
        //this.activeHero.setHP(tempHP);
        this.updateUnits();
        this.activeHero.shapeShift(tempHero);
        tempHero.visible = false;
        this.activeHero.visible = true;
        let tempString = this.activeHero.name;
        this.activeHero.anims.play('shift-' + tempString);
    }

    updateUnits() {
        this.units[0] = this.activeHero;
    }

    nextTurn() {
        if(this.checkEndBattle() || this.surrenderFlag) {           
            this.endBattleDisplay();
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
        else if (action == "surrender") {
            this.surrenderDisplay();
        }
        // next turn in 3 seconds
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    surrenderDisplay() {
        this.events.emit("Message", "Player surrendered!");
        this.victory = false;
        this.surrenderFlag = true;
    }

    endBattleDisplay() {
        var endMessage;
        if (this.victory) {
            endMessage = "You defeated the enemy!"
        }
        else {
            endMessage = "You fainted!"
        }

        this.events.emit("Message", endMessage);
        this.time.addEvent({ delay: 3000, callback: this.endBattle, callbackScope: this });   
    }

    checkEndBattle() {     
        var vict = true;   
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].alive)
                vict = false;
        }
        var loss = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].alive)
                loss = false;
        }

        if (vict) {
            this.victory = true;
        }
        if (loss) {
            this.victory = false;
        }
        return vict || loss;
    }

    endBattle() {       
        // clear state, remove sprites
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].visible = false;            
        }

        // sleep the UI
        this.scene.sleep('UIScene');

        var keymsg = ""
        if (this.timesInCombat > 2) {
            keymsg = 'LevelTwoScene';
        } else {
            keymsg = 'LevelOneScene';
        }
        this.scene.switch(keymsg);
        this.registry.set("Battle", 1);

    }

    getHeroes() {
        return this.heroes;
    }

    getVictory() {
        return this.victory;
    }
}
