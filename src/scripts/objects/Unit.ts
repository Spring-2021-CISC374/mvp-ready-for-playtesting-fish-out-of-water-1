class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage      
        this.alive = true;        
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
            this.scene.endBattle();
        }
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