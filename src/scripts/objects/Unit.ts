import BattleScene from "../scenes/BattleScene";
import BossBattleScene from "../scenes/BossBattleScene";
import Enemy from "./Enemy";
import HealthBar from "./HealthBar";
import PlayerCharacter from "./PlayerCharacter";

export default class Unit extends Phaser.GameObjects.Sprite {
    maxHP: number;
    hp: number;
    damage: any;
    alive: boolean;
    scene: BattleScene;
    name: string;
    healthBar: HealthBar;
    description: string;
    tex: string;

    constructor(scene, x, y, texture, frame, type, hp, damage, name) {
        super(scene, x, y, texture, frame)
        this.scene = scene;
        this.type = type;
        this.maxHP = hp;
        this.hp = hp;
        this.damage = damage; // default damage      
        this.alive = true;    
        this.name = name;    
        this.tex = texture;
    }

    attack(target) {
        target.takeDamage(this.damage);

        if (target instanceof Enemy) {
            this.scene.getEnemyHealth().update(target);
        } else {
            this.scene.getPlayerHealth().update(this.scene.activeHero);
        }

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

    getMaxHP() {
        return this.maxHP;
    }

    isAlive() {
        if (!this.alive) {
            return false;
        }
        return true;
    }

    surrenderDisplay() {
        this.scene.events.emit("Message", "Player surrendered!");
    }

    getType() {
        return this.type;
    }

    getDamage() {
        return this.damage;
    }

    setDamage(x) {
        this.damage = x;
    }

    setDescription(desc) {
        this.description = desc;
    }

    getDescription() {
        return this.description;
    }

    getTexture() {
        return this.tex;
    }
}