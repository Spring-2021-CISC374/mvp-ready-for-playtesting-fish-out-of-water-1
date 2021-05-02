import Menu from "./Menu";

export class ActionsMenu extends Menu {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Attack");
        this.addMenuItem("Shapeshift");
        this.addMenuItem("Get Info");
        this.addMenuItem("Surrender");
        this.addMenuItem("Help")
    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.events.emit("SelectEnemies");
                break;
            case 1:
                this.scene.events.emit("SelectShape");
                break;
            case 2:
                this.scene.events.emit("SelectInfo");
                break;
            case 3:
                this.scene.events.emit("Surrender");
                break;
            case 4:
                this.scene.events.emit("Help");
        }        
    }
    
}