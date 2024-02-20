import type TribeName from '../../../../domain/enum/TribeName.ts'

class GameCaravansDto {
    public constructor(
        private _caravans: Record<TribeName, Record<TribeName, number>> = Object(),
    ) {
    }

    get caravans(): Record<TribeName, Record<TribeName, number>> {
        return this._caravans
    }

    set caravans(caravans: Record<TribeName, Record<TribeName, number>>) {
        this._caravans = caravans
    }
}

export default GameCaravansDto
