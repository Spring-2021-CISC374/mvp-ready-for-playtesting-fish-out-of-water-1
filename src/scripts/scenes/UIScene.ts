import { ActionsMenu } from "../objects/ActionsMenu";
import { EnemiesMenu } from "../objects/EnemiesMenu";
import { HeroesMenu } from "../objects/HeroesMenu";
import Message from "../objects/Message";
import BattleScene from "./BattleScene";

export default class UIScene extends Phaser.Scene {
    graphics: Phaser.GameObjects.Graphics;
    menus: Phaser.GameObjects.Container;
    heroesMenu: HeroesMenu;
    actionsMenu: ActionsMenu;
    enemiesMenu: EnemiesMenu;
    currentMenu: any;
    battleScene: any;
    message: Message;

    constructor() {
        super({ key: "UIScene" });
    }

    create() {    

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);   
        // enemies block     
        this.graphics.strokeRect(0, 150, 100, 100);
        this.graphics.fillRect(0, 150, 100, 100);
        // actions block
        this.graphics.strokeRect(110, 150, 100, 100);
        this.graphics.fillRect(110, 150, 100, 100);
        // shapeshifting block
        this.graphics.strokeRect(220, 150, 100, 100);
        this.graphics.fillRect(220, 150, 100, 100);


        
        // basic container to hold all menus
        //this.menus = this.add.container();
                
        this.heroesMenu = new HeroesMenu(228, 153, this);           
        this.actionsMenu = new ActionsMenu(118, 153, this);            
        this.enemiesMenu = new EnemiesMenu(8, 153, this);   
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);
        
        this.battleScene = this.scene.get("BattleScene");
        
        this.remapHeroes();
        this.remapEnemies();
        
        this.input.keyboard.on("keydown", this.onKeyInput, this);
        
        this.heroesMenu.select(0);
        
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectShape", this.onSelectShapes, this);
        
        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("ShapeShift", this.onShapeShift, this);

        this.events.on("Surrender", this.onSurrender, this);
        
        this.events.on("Enemy", this.onEnemy, this);
        
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);        
        
        this.battleScene.nextTurn();                
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
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("shapeshift", index);
    }

    onPlayerSelect(id) {
        //this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }
    
    onSurrender() {
        this.battleScene.endBattle();
    }

    onSelectShapes() {
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
            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            } 
        }
    }
}