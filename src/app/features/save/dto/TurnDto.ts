import type PlayerDto from './PlayerDto.ts'
import type ActionName from '../../../../domain/enum/ActionName.ts'

class TurnDto {
    parameters: string = ''

    constructor(
        private readonly _player: PlayerDto,
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
        private _action: ActionName | null = null,
    ) {
    }

    get player(): PlayerDto {
        return this._player
    }

    get isLast(): boolean {
        return this._isLast
    }

    get isFinished(): boolean {
        return this._isFinished
    }

    get action(): ActionName | null {
        return this._action
    }

    set action(action: ActionName) {
        this._action = action
    }
}

export default TurnDto
