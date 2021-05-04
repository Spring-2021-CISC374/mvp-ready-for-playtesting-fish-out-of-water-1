export default class EndingScene extends Phaser.Scene {

    victory: boolean;

    constructor() {
        super("EndingScene");
    }

    init(data) {
        this.victory = data.victory;
    }

    create() {

        if (this.victory) {
            this.createVictoryEnding();
        } else {
            this.createLossEnding();
        }
        // listening for spacebar
        this.input.keyboard.on("keydown", this.onKeyInput, this);
    }

    createVictoryEnding() {

        this.add.image(0,0,'sewer-combat').setOrigin(0);

        let height = this.game.config.height as number;
        let width = this.game.config.width as number;

        let boxWidth = width / 1.5;
        let boxHeight = height / 2;

        var graphics = this.add.graphics();
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(width / 2 - 200, height / 2 - 200, boxWidth, boxHeight);
        graphics.fillRect(width / 2 - 200, height / 2 - 200, boxWidth, boxHeight);

        var specStyle = {font: "32px Courier", fill: 'white', align: 'center', wordWrap: {width: boxWidth, useAdvanceWrap: true}};
        var introText = this.add.text(width / 2 - 200 + 15, height / 2 - 200 + 100, "Hooray! You saved the sewers!\n\nPress 'R' to restart!", specStyle);

    }

    createLossEnding() {
        this.add.image(0,0,'sewer-combat').setOrigin(0);

        let height = this.game.config.height as number;
        let width = this.game.config.width as number;

        let boxWidth = width / 1.5;
        let boxHeight = height / 2;

        var graphics = this.add.graphics();
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(width / 2 - 200, height / 2 - 200, boxWidth, boxHeight);
        graphics.fillRect(width / 2 - 200, height / 2 - 200, boxWidth, boxHeight);

        var specStyle = {font: "32px Courier", fill: 'white', align: 'center', wordWrap: {width: boxWidth, useAdvanceWrap: true}};
        var introText = this.add.text(width / 2 - 200 + 15, height / 2 - 200 + 100, "You lose!\n\nPress 'R' to restart!", specStyle);
    }

    onKeyInput(event) {
        if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.R) {
            this.scene.switch("LevelOneScene");
        }
    }

}