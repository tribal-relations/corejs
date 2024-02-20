import type TribeDto from './TribeDto.ts'

class PlayerDto {
    constructor(
        private readonly _tribe: TribeDto,
        private readonly _name: string = 'player 0',
    ) {
    }

    get name(): string {
        return this._name
    }

    get tribe(): TribeDto {
        return this._tribe
    }
}

export default PlayerDto
