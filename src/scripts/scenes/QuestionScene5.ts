import { QuestionMenu5 } from "../objects/QuestionMenu5";
export default class QuestionScene5 extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu5: QuestionMenu5;

    constructor() {
        super({ key: 'QuestionScene5' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'What SHOULD you flush down the toilet?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu5 = new QuestionMenu5(118, 153, this);  
        this.currentMenu = this.QuestionMenu5;
        this.menus.add(this.QuestionMenu5);

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
                this.game.scene.stop('QuestionScene5');
                this.registry.set("Question","5");


            } 
        }
    }
}

