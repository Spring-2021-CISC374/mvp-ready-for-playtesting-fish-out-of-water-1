export default class CombatInstructions extends Phaser.Scene {

    currImage: any;
    height: number;
    width: number;

    constructor() {
        super("CombatInstructions");
    }

    create() {
        this.height = this.game.config.height as number;
        this.width = this.game.config.width as number;

        this.firstSlide();

        this.input.keyboard.on("keydown", this.onKeyInput, this);
        
    }

    onKeyInput(event) {
        if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.firstSlide();
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.RIGHT) {
            this.secondSlide();
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.X) {
            this.scene.sleep();
            this.scene.setVisible(true, "BattleScene");
            this.scene.setVisible(true, "UIScene");
        }
    }

    firstSlide() {
        if (this.currImage != null) {
            this.currImage.destroy();
        }
        var slide = this.add.image(this.width/2,this.height/2,'combatFirst');
        this.currImage = slide;
    }

    secondSlide() {
        this.currImage.destroy();
        var slide = this.add.image(this.width/2,this.height/2,'combatSec');
        slide.setScale(0.95);
        this.currImage = slide;
    }

}