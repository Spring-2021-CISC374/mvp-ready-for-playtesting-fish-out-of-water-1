import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu3 extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("No limit");
        this.addMenuItem("10 ft")
        this.addMenuItem("500 ft");
        this.addMenuItem("2 ft");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("C1","A");
                break;
            case 1:
                this.scene.registry.set("C1","B");
                break;
            case 2:
                this.scene.registry.set("C1","C");
                break;
            case 3:
                this.scene.registry.set("C1","D");
                break;
        }        
    }
    
}