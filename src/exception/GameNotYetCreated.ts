import AppException from './AppException'

class GameNotYetCreated extends AppException {
    constructor() {
        super('The game instance is not yet created.')
    }
}

export default GameNotYetCreated
