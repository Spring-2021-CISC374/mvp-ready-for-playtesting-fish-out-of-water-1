
export default class LevelOneScene extends Phaser.Scene {
  flounder: Phaser.Physics.Arcade.Sprite

  constructor() {
    super({ key: 'LevelOneScene' })
  }
  create() {
	//Create map from Tiled and add necessary collisions
	const map = this.make.tilemap({key: "sewer1"})
	const tileset = map.addTilesetImage('Pipes', 'pipes')
	//const background = map.createLayer('Background', tileset)
	const foreground = map.createLayer('Sewer', tileset)
	foreground.setCollisionByProperty({collides: true})

	//debug collisions
	const debugGraphics = this.add.graphics().setAlpha(0.7);
	foreground.renderDebug(debugGraphics, {
		tileColor: null,
		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		faceColor: new Phaser.Display.Color(40,39,37,255)
	})

	//Create fish
	this.flounder = this.physics.add.sprite(0,435,'flounder', 'Flounder 1.png').setScale(0.1)
	this.flounder.anims.play('flounder-idle')
	this.physics.add.collider(this.flounder, foreground)
	//Initialize cameras to follow fish
	this.cameras.main.startFollow(this.flounder,true)
  }

  update(){
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
			this.flounder.y = this.flounder.y - 1.5;
			this.flounder.angle = 270;
		}
		if (cursors.down.isDown) {
			this.flounder.y = this.flounder.y + 1.5;
			this.flounder.angle = 90;
		}
		if (cursors.left.isDown) {
			this.flounder.x = this.flounder.x - 1.5;
			this.flounder.angle = 180;
		}
		if (cursors.right.isDown) {
			this.flounder.x = this.flounder.x + 1.5;
			this.flounder.angle = 0;
		}
  }
}
