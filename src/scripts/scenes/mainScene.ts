import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
  private background;
  
  constructor() {
    super({ key: 'MainScene' })
  }
  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
  }
  initBackground() {
    this.background = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, "background").setOrigin(0, 0).setScrollFactor(0);
    this.background.tilePositionX = this.cameras.main.scrollX * .3;
}
}
