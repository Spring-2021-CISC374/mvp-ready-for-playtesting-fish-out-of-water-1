
export default class PipeFound {
    pipesFound;
    constructor() {
        this.pipesFound = 0
    }

    incrementPipesFound() {
        this.pipesFound++
    }
    getPipesFound() {
        return this.pipesFound;
    }
    
}