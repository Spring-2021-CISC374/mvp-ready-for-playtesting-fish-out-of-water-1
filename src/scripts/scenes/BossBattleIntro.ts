export default class BossBattleIntro extends Phaser.Scene {

    constructor() {
        super("BossBattleIntro");
    }

    create() {
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
        var introText = this.add.text(width / 2 - 200 + 25, height / 2 - 200 + 75, "You can't leave so easily...\n\nYou must go through me first.", specStyle);


        this.time.addEvent({ delay: 3000, callback: this.switch, callbackScope: this });
    }

    switch() {
        this.scene.sleep();
    }


}