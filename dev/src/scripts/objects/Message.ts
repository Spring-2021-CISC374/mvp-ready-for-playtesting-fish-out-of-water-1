export default class Message extends Phaser.GameObjects.Container {
    text: Phaser.GameObjects.Text;
    hideEvent: any;

    constructor(scene, events) {
        super(scene, scene.game.config.width/3, scene.game.config.height/10);
        let height = this.scene.game.config.height as number;
        let width = this.scene.game.config.width as number;

        let boxWidth = width / 3;
        let boxHeight = boxWidth / 3;

        var graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(0, 0, boxWidth, boxHeight);
        graphics.fillRect(0, 0, boxWidth, boxHeight);
        this.text = new Phaser.GameObjects.Text(scene, 105, 30, "", { color: "#ffffff", align: "center", fontSize: '13px', wordWrap: { width: boxWidth, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);        
        events.on("Message", this.showMessage, this);
        this.visible = false;
    }

    showMessage(text) {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 3000, callback: this.hideMessage, callbackScope: this });
    }

    hideMessage() {
        this.hideEvent = null;
        this.visible = false;
    }
}