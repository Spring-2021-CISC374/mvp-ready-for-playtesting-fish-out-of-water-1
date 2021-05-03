import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu6 extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("To contain dangerous wastewater");
        this.addMenuItem("We don't")
        this.addMenuItem("No one knows");
        this.addMenuItem("Sewer systems aren't real");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("F1","A");
                break;
            case 1:
                this.scene.registry.set("F1","B");
                break;
            case 2:
                this.scene.registry.set("F1","C");
                break;
            case 3:
                this.scene.registry.set("F1","D");
                break;
        }        
    }
    
}