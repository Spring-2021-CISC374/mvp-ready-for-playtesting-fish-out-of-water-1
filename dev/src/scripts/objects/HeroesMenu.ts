import Menu from "./Menu";

export class HeroesMenu extends Menu{
    act: string;
    
    constructor(x, y, scene) {
        super(x, y, scene);                    
    }

    confirm() {
        this.scene.events.emit(this.act, this.menuItemIndex);
    }

    setAct(st) {
        this.act = st;
    }
}