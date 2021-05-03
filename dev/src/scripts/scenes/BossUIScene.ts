import { ActionsMenu } from "../objects/ActionsMenu";
import { EnemiesMenu } from "../objects/EnemiesMenu";
import { HeroesMenu } from "../objects/HeroesMenu";
import Message from "../objects/Message";
import BattleScene from "./BattleScene";

export default class BossUIScene extends Phaser.Scene {
    graphics: Phaser.GameObjects.Graphics;
    menus: Phaser.GameObjects.Container;
    heroesMenu: HeroesMenu;
    actionsMenu: ActionsMenu;
    enemiesMenu: EnemiesMenu;
    currentMenu: any;
    battleScene: any;
    message: Message;
    enemiesTitle: Phaser.GameObjects.Text;
    actionsTitle: Phaser.GameObjects.Text;
    heroesTitle: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "BossUIScene" });
    }

    create() {    

        let width = this.game.config.width as number;
        let height = this.game.config.height as number;
        height = height * 7/10;

        let bound1 =  width / 3 - 10;
        let bound2 = bound1 + 20;
        let bound3 = width / 3 * 2 - 10;
        let bound4 = bound3 + 20;

        let fill1 = bound1;
        let fill2 = bound3 - bound2;
        let fill3 = width - bound4;
        let vfill = height * 7/10;

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);   
        // enemies block     
        this.graphics.strokeRect(0, height, fill1, vfill);
        this.graphics.fillRect(0, height, fill1, vfill);
        // actions block
        this.graphics.strokeRect(bound2, height, fill2, vfill);
        this.graphics.fillRect(bound2, height, fill2, vfill);
        // shapeshifting block
        this.graphics.strokeRect(bound4, height, fill3, vfill);
        this.graphics.fillRect(bound4, height, fill3, vfill);
        
        // titles for each menu
        this.graphics.fillStyle(0x150811, 1);
        this.graphics.strokeRect(0, height - 50, fill1, 50);
        this.graphics.fillRect(0, height - 50, fill1, 50);

        this.graphics.strokeRect(bound2, height - 50, fill2, 50);
        this.graphics.fillRect(bound2, height - 50, fill2, 50);

        this.graphics.strokeRect(bound4, height - 50, fill3, 50);
        this.graphics.fillRect(bound4, height - 50, fill3, 50);

        var specStyle = {font: "32px Courier", fill: 'white', align: 'center'};

        this.enemiesTitle = this.add.text(25, height - 40, "Enemies", specStyle);
        this.actionsTitle = this.add.text(bound2 + 25, height - 40, "Actions", specStyle);
        this.heroesTitle = this.add.text(bound4 + 25, height - 40, "Heroes", specStyle);

        // basic container to hold all menus
        this.menus = this.add.container();
                
        this.heroesMenu = new HeroesMenu(bound4 + 8, height + 8, this);           
        this.actionsMenu = new ActionsMenu(bound2 + 8, height + 8, this);            
        this.enemiesMenu = new EnemiesMenu(8, height + 8, this);   
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);
        
        this.battleScene = this.scene.get("BossBattleScene");
        
        this.input.keyboard.on("keydown", this.onKeyInput, this);
        
        this.heroesMenu.select(0);
        
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectShape", this.onSelectShapes, this);
        
        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("ShapeShift", this.onShapeShift, this);

        this.events.on("Surrender", this.onSurrender, this);

        this.events.on("SelectInfo", this.onSelectInfo, this);

        this.events.on("GetInfo", this.onGetInfo, this);

        this.events.on("Help", this.onHelp, this);

        this.events.on("Enemy", this.onEnemy, this);
        
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);        

        this.sys.events.on('wake', this.createMenu, this);

        this.createMenu();            
    }
    createMenu() {
        // map hero menu items to heroes
        this.remapHeroes();
        // map enemies menu items to enemies
        this.remapEnemies();
        // first move
        this.battleScene.nextTurn(); 
    }

    onHelp() {
        this.scene.launch("CombatInstructions");
        this.battleScene.scene.setVisible(false);
        this.scene.setVisible(false);
    }

    onEnemy(index) {
        //this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("attack", index);
    }

    onShapeShift(index) {
        this.enemiesMenu.deselect();
        this.actionsMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("shapeshift", index);
    }
      
    onGetInfo(index) {
        this.enemiesMenu.deselect();
        this.actionsMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("getInfo", index);
        this.heroesMenu[index].deselect();
    }

    onPlayerSelect(id) {
        //this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }
    
    onSurrender() {
        //this.battleScene.activeHero.surrenderDisplay();
        this.battleScene.receivePlayerSelection("surrender", null);
    }

    onSelectShapes() {
        this.heroesMenu.setAct("ShapeShift");
        this.currentMenu = this.heroesMenu;
        this.heroesMenu.select(0);
    }

    onSelectInfo() {
        this.heroesMenu.setAct("GetInfo");
        this.currentMenu = this.heroesMenu;
        this.heroesMenu.select(0);
    }

    onSelectEnemies() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    remapHeroes() {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    }

    remapEnemies() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    }

    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "Space") {
                this.currentMenu.confirm();
            } 
        }
    }
}