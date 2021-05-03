import { QuestionMenu2 } from "../objects/QuestionMenu2";
export default class QuestionScene2 extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu2: QuestionMenu2;

    constructor() {
        super({ key: 'QuestionScene2' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'What are signs that tree roots are growing into sewer pipes?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu2 = new QuestionMenu2(118, 153, this);  
        this.currentMenu = this.QuestionMenu2;
        this.menus.add(this.QuestionMenu2);

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
                this.game.scene.stop('QuestionScene2');
                this.registry.set("Question","2");


            } 
        }
    }
}

