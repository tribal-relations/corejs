import NotFoundException from './NotFoundException'

class PlayerNotFound extends NotFoundException {
    constructor(playerName: string, gameName: string) {
        super(`Player from game "${gameName}"`, playerName)
    }
}

export default PlayerNotFound
