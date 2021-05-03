import { QuestionMenu1 } from "../objects/QuestionMenu1";
export default class QuestionScene extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu1: QuestionMenu1;

    constructor() {
        super({ key: 'QuestionScene1' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'Which of these items CAN go through the drain?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu1 = new QuestionMenu1(118, 153, this);  
        this.currentMenu = this.QuestionMenu1;
        this.menus.add(this.QuestionMenu1);

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
                this.game.scene.stop('QuestionScene1');
                this.registry.set("Question","1");


            } 
        }
    }
}

