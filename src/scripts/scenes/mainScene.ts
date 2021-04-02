import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
  private background;

  constructor() {
    super({ key: 'MainScene' })
  }
  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
  }
  
}
