import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu5 extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Baby wipes");
        this.addMenuItem("Toilet paper")
        this.addMenuItem("Diapers");
        this.addMenuItem("Fish");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("E1","A");
                break;
            case 1:
                this.scene.registry.set("E1","B");
                break;
            case 2:
                this.scene.registry.set("E1","C");
                break;
            case 3:
                this.scene.registry.set("E1","D");
                break;
        }        
    }
    
}