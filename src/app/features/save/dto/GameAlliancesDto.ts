import type TribeName from '../../../../domain/enum/TribeName.ts'
import type CurrentGame from '../../../CurrentGame.ts'

class GameAlliancesDto {
    public constructor(
        private _alliances: Record<TribeName, Record<TribeName, boolean>> = Object(),
    ) {
    }

    static createFromCurrentGame(game: CurrentGame): GameAlliancesDto {
        // TODO implement
        const dto = new GameAlliancesDto(
            Object(),
        )

        return dto
    }

    get alliances(): Record<TribeName, Record<TribeName, boolean>> {
        return this._alliances
    }

    set alliances(relations: Record<TribeName, Record<TribeName, boolean>>) {
        this._alliances = relations
    }
}

export default GameAlliancesDto
