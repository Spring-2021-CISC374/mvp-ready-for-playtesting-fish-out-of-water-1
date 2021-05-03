import { QuestionMenu4 } from "../objects/QuestionMenu4";
export default class QuestionScene extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu4: QuestionMenu4;

    constructor() {
        super({ key: 'QuestionScene4' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'what can sewage water/wastewater be used for after filtration?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu4 = new QuestionMenu4(118, 153, this);  
        this.currentMenu = this.QuestionMenu4;
        this.menus.add(this.QuestionMenu4);

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
                this.game.scene.stop('QuestionScene4');
                this.registry.set("Question","4");


            } 
        }
    }
}

