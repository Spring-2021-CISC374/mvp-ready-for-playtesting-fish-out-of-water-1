import 'phaser'
import LevelOneScene from './scenes/levelOneScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 512
const DEFAULT_HEIGHT = 512

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, LevelOneScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
