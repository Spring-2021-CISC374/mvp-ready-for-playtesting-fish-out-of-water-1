import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
  private background;
  player:PhaserLogo;

  constructor() {
    super({ key: 'MainScene' })
  }
  create() {
    this.player = new PhaserLogo(this, this.cameras.main.width / 2, 0);
  }

  update(){
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
			this.player.y = this.player.y - 1.5;
			this.player.angle = 90;
		}
		if (cursors.down.isDown) {
			this.player.y = this.player.y + 1.5;
			this.player.angle = 270;
		}
		if (cursors.left.isDown) {
			this.player.x = this.player.x - 1.5;
			this.player.angle = 0;
		}
		if (cursors.right.isDown) {
			this.player.x = this.player.x + 1.5;
			this.player.angle = 180;
		}
  }
}
