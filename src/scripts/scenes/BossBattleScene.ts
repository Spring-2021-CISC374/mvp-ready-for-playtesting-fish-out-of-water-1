import { Physics } from "phaser";
import Enemy from "../objects/Enemy";
import HealthBar from "../objects/HealthBar";
//import HealthBar from "../objects/HealthBar";
import PlayerCharacter from "../objects/PlayerCharacter";
import Unit from "../objects/Unit";
import LevelTwoScene from "./levelTwoScene";

export default class BossBattleScene extends Phaser.Scene {
    combatMusic:Phaser.Sound.BaseSound;
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
    setEnemies: Enemy[];
    parentScene: any;
    extraDamage:boolean;
    extraHealth:boolean;
    extraLife:boolean;
    background: Phaser.GameObjects.Image;
    fightPos1: number;
    fightPos2: number;
    
    constructor() {
        super({ key: "BossBattleScene" });
    }

    init(data) {
        this.extraDamage = data.extraDamage;
        this.extraHealth = data.extraHealth;
        this.extraLife = data.extraLife;
    }

    create() {
        // load background image
        //this.cameras.main.("0x8B8BAE");
        this.combatMusic = this.sound.add('combatmusic', {loop: true, volume: 0.5});
        this.combatMusic.play


        this.parentScene = this.scene.get("LevelTwoScene");

        this.scene.launch("BossBattleIntro");

        this.time.addEvent({ delay: 3000, callback: this.begin, callbackScope: this });

        this.sys.events.on('wake', this.wake, this);   
    }

    begin() {
        this.background = this.add.image(0,0,'sewer-combat').setOrigin(0); 
        // Run UI Scene at the same time

        this.scene.launch("BossUIScene");
        this.startBattle(); 
    }

    startBattle() {
        
        let height = this.game.config.height as number;
        let width = this.game.config.width as number;

        let fightHeight = height/2 - 50;
        this.fightPos1 = width * .8;
        this.fightPos2 = width * .2;

        this.victory = false;
        this.surrenderFlag = false;

        // main combat character
        var fish = new PlayerCharacter(this, this.fightPos1, fightHeight, "combat", null, "Fish", 100, 20, "fish");        
        this.add.existing(fish);
        fish.anims.play('combat-flounder');
        fish.setDescription("Name: Fish\nHealth: 100HP\nYour basic fish.\nNo strengths/weaknesses.")

        var finalBoss = new Enemy(this, this.fightPos2, fightHeight, "enemy-pufferfish", null, "Puffer", 150, 20, "pufferfish");
        this.add.existing(finalBoss);
        finalBoss.anims.play('enemy-pufferfish');

        var orca = new PlayerCharacter(this, this.fightPos1, fightHeight, "shift-orca", null, "Orca", 100, 40, "orca");
        this.add.existing(orca);
        orca.visible = false;
        orca.setDescription("Name: Orca\nHealth: 100HP\nStrengths: Apex predator\n Weaknesses: pollution");

        var shrimp = new PlayerCharacter(this, this.fightPos1, fightHeight, "shift-shrimp", null,"Shrimp", 100, 5, "shrimp");
        this.add.existing(shrimp);
        shrimp.visible = false;
        shrimp.setDescription("Name: Shrimp\nHealth: 100HP\nStrengths: abundant\nWeaknesses: natural prey");

        if (this.extraDamage) {
            console.log("extra damage");
            fish.setDamage(30);
            orca.setDamage(45);
            shrimp.setDamage(10);
        }

        if (this.extraHealth) {
            console.log('extra health');
            fish.setHP(150);
            orca.setHP(150);
            shrimp.setHP(150);
        }

        // array with heroes
        this.heroes = [ fish, orca, shrimp ];
        this.activeID = 0;
        this.activeHero = this.heroes[this.activeID];
        this.activeHeroHP = this.activeHero.getHP();
        // array with enemies
        this.activeEnemy = finalBoss;

        this.playerHealth = new HealthBar(this, this.fightPos1, this.activeHero.y - 100, this.activeHero);
        this.enemyHealth = new HealthBar(this, this.fightPos2, this.activeEnemy.y - 100, this.activeEnemy);

        this.enemies = [ this.activeEnemy ];
        // array with both parties, who will attack
        this.units = [this.activeHero];
        this.units = this.units.concat(this.enemies);

        this.index = -1;

        // Run UI Scene at the same time

        //this.scene.launch("BossUIScene");
    }

    getPlayerHealth() {
        return this.playerHealth;
    }

    getEnemyHealth() {
        return this.enemyHealth;
    }

    wake() {
        this.scene.launch("BossBattleIntro");
        this.time.addEvent({ delay: 3000, callback: this.wakePartTwo, callbackScope: this });     
    }

    wakePartTwo() {
        this.victory = false
        this.surrenderFlag = false;

        this.background = this.add.image(0,0,'sewer-combat').setOrigin(0); 

        this.scene.wake("BossUIScene");

        this.startBattle();
    }

    shapeShiftHero(index) {
        var tempHP = this.activeHero.getHP();
        var tempHero = this.activeHero;
        this.activeID = index;
        //this.heroes[this.activeID].setHP(tempHP);
        this.activeHero = this.heroes[this.activeID];
        this.activeHero.setHP(tempHP);
        this.updateUnits();
        this.activeHero.shapeShift(tempHero);
        tempHero.visible = false;
        this.activeHero.visible = true;
        let tempString = this.activeHero.name;
        this.activeHero.anims.play('shift-' + tempString);
    }
    getInfo(index) {
        // displaying info about animal
        // Name: ____
        // Health: ____
        // Strengths: ____
        // Weaknesses: ____
        this.events.emit("Message", this.heroes[index].getDescription());
    }
    updateUnits() {
        this.units[0] = this.activeHero;
    }

    nextTurn() {
        if(this.checkEndBattle() || this.surrenderFlag) {
            if (this.extraLife) {
                this.extraLife = false;
                this.events.emit("Message", "Power Up: Extra life used!");
                this.heroes.forEach(this.rebirth);
                this.playerHealth.update(this.activeHero);
            } else {           
                this.endBattleDisplay();
            }
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

    rebirth(ind) {
        ind.setHP(100);
    }

    // when the player have selected the enemy to be attacked
    receivePlayerSelection(action, target) {
        if(action == "attack") {            
            this.units[this.index].attack(this.enemies[target]);   
        }
        else if (action == "shapeshift") {
            this.shapeShiftHero(target);
        }
        else if (action == "getInfo") {
            this.getInfo(target);
            this.index--;                       // makes sure turn is repeated
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
            this.victory = false;
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
        
        if(this.activeHero.getHP() > 0) {
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
        this.background.destroy();
        this.playerHealth.destroy();
        this.enemyHealth.destroy();
        this.scene.sleep('BossUIScene');
        this.scene.sleep();
        this.game.scene.start('EndingScene', {victory: this.victory});
        this.registry.set("Battle", 1);
        this.combatMusic.stop

    }

    getHeroes() {
        return this.heroes;
    }

    getVictory() {
        return this.victory;
    }
}
