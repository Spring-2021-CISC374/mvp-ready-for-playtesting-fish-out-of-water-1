class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }

    preload() {
        // load resources
        this.load.spritesheet("player", "/src/assets/RPG_assets.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("dragonblue", "/src/assets/dragonblue.png");
        this.load.image("dragonorrange", "/src/assets/dragonorrange.png");
    }

    create() {
        this.scene.start("BattleScene");
    }
}