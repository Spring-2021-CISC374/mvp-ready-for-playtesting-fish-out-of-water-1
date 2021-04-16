import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu5 extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("A.");
        this.addMenuItem("B.")
        this.addMenuItem("C.");
        this.addMenuItem("D.");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("A1","A");
                break;
            case 1:
                this.scene.registry.set("A1","B");
                break;
            case 2:
                this.scene.registry.set("A1","C");
                break;
            case 3:
                this.scene.registry.set("A1","D");
                break;
        }        
    }
    
}