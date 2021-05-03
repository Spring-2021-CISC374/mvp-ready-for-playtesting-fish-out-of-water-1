import Unit from "./Unit";

export default class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage, name) {
        super(scene, x, y, texture, frame, type, hp, damage, name);
        this.setScale(0.5);
    }
}