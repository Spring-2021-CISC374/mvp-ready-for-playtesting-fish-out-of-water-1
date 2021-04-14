import 'phaser'
import LevelOneScene from './scenes/levelOneScene'
import LevelTwoScene from './scenes/levelTwoScene'
import PreloadScene from './scenes/preloadScene'
import BattleScene from './scenes/BattleScene'
import QuestionScene from './scenes/QuestionScene'
import UIScene from './scenes/UIScene'
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 640
const DEFAULT_HEIGHT = 640

const config: GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, LevelOneScene, LevelTwoScene, BattleScene, UIScene, QuestionScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  render: {
    pixelArt: true
  }
}

window.addEventListener('load', () => {
  window['game'] = new Phaser.Game(config);
});
