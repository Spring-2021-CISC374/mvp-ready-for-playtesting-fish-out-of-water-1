import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu4 extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Nothing");
        this.addMenuItem("Human consumption")
        this.addMenuItem("Watering crops");
        this.addMenuItem("Both B. and C.");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("D1","A");
                break;
            case 1:
                this.scene.registry.set("D1","B");
                break;
            case 2:
                this.scene.registry.set("D1","C");
                break;
            case 3:
                this.scene.registry.set("D1","D");
                break;
        }        
    }
    
}