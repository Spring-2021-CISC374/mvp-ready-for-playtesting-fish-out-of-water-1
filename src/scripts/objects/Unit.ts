import BattleScene from "../scenes/BattleScene";

export default class Unit extends Phaser.GameObjects.Sprite {
    maxHp: any;
    hp: any;
    damage: any;
    alive: boolean;
    scene: BattleScene;
    name: string;
    constructor(scene, x, y, texture, frame, type, hp, damage, name) {
        super(scene, x, y, texture, frame)
        this.scene = scene;
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage      
        this.alive = true;    
        this.name = name;    
    }

    attack(target) {
        target.takeDamage(this.damage);
        this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    }

    shapeShift(previous) {
        this.scene.events.emit("Message", previous.getType() + " turned into a " + this.type);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
        }
    }

    setHP(hp) {
        this.hp = hp;
    }

    getHP() {
        return this.hp;
    }

    isAlive() {
        if (!this.alive) {
            this.scene.events.emit("Message", this.type + " faints! Battle is over!");
            if ("endBattle" in this.scene) {
                this.scene.endBattle();
            }
        }
    }

    surrenderDisplay() {
        this.scene.events.emit("Message", "Player surrendered!");
    }

    getType() {
        return this.type;
    }

    getHealth() {
        return this.hp;
    }

    getDamage() {
        return this.damage;
    }
}