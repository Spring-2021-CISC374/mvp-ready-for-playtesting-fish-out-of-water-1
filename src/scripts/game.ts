import 'phaser'
import LevelOneScene from './scenes/levelOneScene'
import LevelTwoScene from './scenes/levelTwoScene'
import InstructionScene from './scenes/InstructionScene'
import PreloadScene from './scenes/preloadScene'
import BattleScene from './scenes/BattleScene'
import BossBattleScene from './scenes/BossBattleScene'
import QuestionScene1 from './scenes/QuestionScene1'
import QuestionScene2 from './scenes/QuestionScene2'
import QuestionScene3 from './scenes/QuestionScene3'
import QuestionScene4 from './scenes/QuestionScene4'
import QuestionScene5 from './scenes/QuestionScene5'
import QuestionScene6 from './scenes/QuestionScene6'
import UIScene from './scenes/UIScene'
import BossUIScene from './scenes/BossUIScene'
import PipeScene from './scenes/PipeScene'
import BattleIntro from './scenes/BattleIntro'
import BossBattleIntro from './scenes/BossBattleIntro'
import CombatInstructions from './scenes/CombatInstructions'
import EndingScene from './scenes/EndingScene'
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
  scene: [PreloadScene, InstructionScene, LevelOneScene, LevelTwoScene, PipeScene, BattleIntro, BossBattleIntro, CombatInstructions, BattleScene, BossBattleScene, UIScene, BossUIScene,
    QuestionScene1,QuestionScene2,QuestionScene3, QuestionScene4, QuestionScene5, QuestionScene6, EndingScene],
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
