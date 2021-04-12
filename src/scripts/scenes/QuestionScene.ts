import { QuestionMenu } from "../objects/QuestionMenu";
export default class QuestionScene extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu: QuestionMenu;

    constructor() {
        super({ key: 'QuestionScene' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'Question here:');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu = new QuestionMenu(118, 153, this);  
        this.currentMenu = this.QuestionMenu;
        this.menus.add(this.QuestionMenu);

        this.input.keyboard.on("keydown", this.onKeyInput, this);               
    }


    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
                this.game.scene.stop('QuestionScene');


            } 
        }
    }
}

