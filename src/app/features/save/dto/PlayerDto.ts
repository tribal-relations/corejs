import TribeDto from './TribeDto.ts'
import type Player from '../../../../domain/entity/Player.ts'

class PlayerDto {
    constructor(
        private readonly _tribe: TribeDto,
        private readonly _name: string = 'player 0',
    ) {
    }

    static createFromPlayer(player: Player): PlayerDto {
        const dto = new PlayerDto(
            TribeDto.createFromTribe(player.tribe),
            player.name,
        )

        return dto
    }

    get name(): string {
        return this._name
    }

    get tribe(): TribeDto {
        return this._tribe
    }
}

export default PlayerDto
