import type TribeName from '../../../../domain/enum/TribeName.ts'

class GameAlliancesDto {
    public constructor(
        private _alliances: Record<TribeName, Record<TribeName, boolean>> = Object(),
    ) {
    }

    get alliances(): Record<TribeName, Record<TribeName, boolean>> {
        return this._alliances
    }

    set alliances(relations: Record<TribeName, Record<TribeName, boolean>>) {
        this._alliances = relations
    }
}

export default GameAlliancesDto
