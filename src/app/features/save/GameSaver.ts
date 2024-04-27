import SaveDto from './dto/SaveDto.ts'
import type SaveWriter from './SaveWriter.ts'
import type CurrentGame from '../../CurrentGame.ts'

class GameSaver {
    constructor(
        private readonly _currentGame: CurrentGame,
        private readonly _saveWriter: SaveWriter,

    ) {
    }

    public saveGame(filename: null | undefined | string = null): SaveDto {
        const dto = this.getCurrentGameSaveDto(this._currentGame)
        this._saveWriter.write(dto, filename)

        return dto
    }

    public loadGame(saveName: string): void {
        // TODO https://github.com/tribal-relations/client/issues/164
    }

    private loadGameFromDto(save: SaveDto): void {
        // TODO https://github.com/tribal-relations/client/issues/164
    }

    private getCurrentGameSaveDto(game: CurrentGame): SaveDto {
        let dto = SaveDto.createFromCurrentGame(game)
        dto = this.removeCircularDependencies(dto)
        return dto
    }

    private removeCircularDependencies(dto: SaveDto): SaveDto {
        // TODO implement
        return dto
    }
}

export default GameSaver
