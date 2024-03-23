import type TribeName from '../../../../domain/enum/TribeName.ts'
import type CurrentGame from '../../../CurrentGame.ts'

class GameCaravansDto {
    public constructor(
        private _caravans: Record<TribeName, Record<TribeName, number>> = Object(),
    ) {
    }

    static createFromCurrentGame(game: CurrentGame): GameCaravansDto {
        // TODO implement
        const dto = new GameCaravansDto(
            Object(),
        )

        return dto
    }

    get caravans(): Record<TribeName, Record<TribeName, number>> {
        return this._caravans
    }

    set caravans(caravans: Record<TribeName, Record<TribeName, number>>) {
        this._caravans = caravans
    }
}

export default GameCaravansDto
