import type SaveDto from './dto/SaveDto'
import type CurrentGame from '../../CurrentGame.ts'

class GameSaver {
    constructor() {
    }

    public saveGame(game: CurrentGame): SaveDto {
        // TODO https://github.com/tribal-relations/client/issues/163

    }

    public loadGame(save: SaveDto): void {
        // TODO https://github.com/tribal-relations/client/issues/164
    }
}

export default GameSaver
