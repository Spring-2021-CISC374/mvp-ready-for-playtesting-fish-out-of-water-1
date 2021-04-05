class ActionsMenu extends Menu {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Attack");
        this.addMenuItem("Shapeshift")
        this.addMenuItem("Surrender");
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
                this.scene.events.emit("Surrender");
                break;
        }        
    }
    
}