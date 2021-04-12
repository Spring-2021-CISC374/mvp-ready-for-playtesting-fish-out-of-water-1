import Menu from "./Menu";

export class QuestionMenu extends Menu {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Answer A");
        this.addMenuItem("Answer B")
        this.addMenuItem("Answer C");
        this.addMenuItem("Answer D");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.events.emit("A");
                break;
            case 1:
                this.scene.events.emit("B");
                break;
            case 2:
                this.scene.events.emit("C");
                break;
            case 3:
                this.scene.events.emit("D");
                break;
        }        
    }
    
}