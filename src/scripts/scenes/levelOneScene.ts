import PhaserLogo from '../objects/phaserLogo'

export default class LevelOneScene extends Phaser.Scene {
  player:PhaserLogo;
  private camera;

  constructor() {
    super({ key: 'LevelOneScene' })
  }
  create() {
	//Create map from Tiled
	const map = this.make.tilemap({key: "sewer1"})
    const tileset = map.addTilesetImage('Pipes', 'pipes')
	const background = map.createLayer('Tile Layer 1', tileset)
	background.setCollisionFromCollisionGroup(true)
	//Create player (temp)
	this.player = new PhaserLogo(this, 0, 0)
	this.player.setScale(0.15)
	this.player.setCollideWorldBounds(true)
	//Initialize cameras to follow player
	//this.cameras.main.setBounds(0, 0,this.game.config.maxWidth, this.game.config.maxHeight)
	//this.physics.world.setBounds(0, 0,512, 512)
	this.cameras.main.startFollow(this.player)
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
