import { QuestionMenu6 } from "../objects/QuestionMenu6";
export default class QuestionScene6 extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu6: QuestionMenu6;

    constructor() {
        super({ key: 'QuestionScene6' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'Why do we need a sewer system?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu6 = new QuestionMenu6(118, 153, this);  
        this.currentMenu = this.QuestionMenu6;
        this.menus.add(this.QuestionMenu6);

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
                this.game.scene.stop('QuestionScene6');
                this.registry.set("Question","6");


            } 
        }
    }
}

