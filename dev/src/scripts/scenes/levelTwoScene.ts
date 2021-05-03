import Level from './level';

export default class LevelTwoScene extends Level{
    constructor(){
        // Name this scene LevelTwoScene,
        // Use json map with key 'sewerlevel2'
        // 'LevelThreeScene' indicates which scene to jump to after.
        super('LevelTwoScene', 'sewerlevel2', '')
    }
    init(data){
        this.pipeScore = data.pipeScore;
      }
}