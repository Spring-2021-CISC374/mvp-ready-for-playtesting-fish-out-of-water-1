import Menu from "./Menu";

export class HeroesMenu extends Menu{
    
    constructor(x, y, scene) {
        super(x, y, scene);                    
    }

    confirm() {
        this.scene.events.emit("ShapeShift", this.menuItemIndex);
    }
}