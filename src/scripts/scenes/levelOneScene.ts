import Level from './level';

export default class LevelOneScene extends Level{

    constructor(){
        // Name this scene LevelOneScene,
        // Use json map with key 'sewerlevel1'
        // 'LevelTwoScene' indicates which scene to jump to after.
        super('LevelOneScene', 'sewerlevel1', 'LevelTwoScene')
    }
}