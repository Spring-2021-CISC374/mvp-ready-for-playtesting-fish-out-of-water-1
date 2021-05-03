import { QuestionMenu3 } from "../objects/QuestionMenu3";
export default class QuestionScene extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu3: QuestionMenu3;

    constructor() {
        super({ key: 'QuestionScene3' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'How far should a tree be planted from a sewer line?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu3 = new QuestionMenu3(118, 153, this);  
        this.currentMenu = this.QuestionMenu3;
        this.menus.add(this.QuestionMenu3);

        this.input.keyboard.on("keydown", this.onKeyInput, this);               
    }


    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "Space") {
                this.currentMenu.confirm();
                this.game.scene.stop('QuestionScene3');
                this.registry.set("Question","3");


            } 
        }
    }
}

