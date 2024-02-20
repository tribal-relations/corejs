import type GameAlliancesDto from './GameAlliancesDto.ts'
import type GameCaravansDto from './GameCaravansDto.ts'
import type GameRelationsDto from './GameRelationsDto.ts'
import type PlayerDto from './PlayerDto.ts'
import type TurnDto from './TurnDto.ts'
import type WinningConditionName from '../../../../domain/enum/WinningConditionName.ts'

class CurrentGameDto {
    constructor(
        private readonly _name: string,
        private readonly _startDate: Date = new Date(),
        private _endDate: Date | null = null,
        private _isStarted: boolean = false,
        private _isFinished: boolean = false,
        private readonly _playersLength: number = 4,
        private readonly _players: Record<string, PlayerDto> = Object(),
        private readonly _currentTurnNumber: number = 0,
        private readonly _currentTurn: TurnDto | null = null,
        private readonly _turns: TurnDto[] = [],
        private readonly _currentRoundNumber: number = 1,
        private readonly _alliances: GameAlliancesDto,
        private readonly _caravans: GameCaravansDto,
        private readonly _relations: GameRelationsDto,
        private _winner: PlayerDto | null = null,
        private _winningCondition: WinningConditionName | null = null,
    ) {
    }

    get players(): Record<string, PlayerDto> {
        return this._players
    }

    get playersLength(): number {
        return this._playersLength
    }

    get currentTurnNumber(): number {
        return this._currentTurnNumber
    }

    get currentRoundNumber(): number {
        return this._currentRoundNumber
    }

    get currentTurn(): TurnDto | null {
        return this._currentTurn
    }

    get turns(): TurnDto[] {
        return this._turns
    }

    get alliances(): GameAlliancesDto {
        return this._alliances
    }

    get caravans(): GameCaravansDto {
        return this._caravans
    }

    get relations(): GameRelationsDto {
        return this._relations
    }

    get startDate(): Date {
        return this._startDate
    }

    get endDate(): Date | null {
        return this._endDate
    }

    set endDate(endDate: Date) {
        this._endDate = endDate
    }

    get name(): string {
        return this._name
    }

    get isStarted(): boolean {
        return this._isStarted
    }

    set isStarted(isStarted: boolean) {
        this._isStarted = isStarted
    }

    get isFinished(): boolean {
        return this._isFinished
    }

    set isFinished(isFinished: boolean) {
        this._isFinished = isFinished
    }

    get winner(): PlayerDto | null {
        return this._winner
    }

    set winner(winner: PlayerDto) {
        this._winner = winner
    }

    get winningCondition(): WinningConditionName | null {
        return this._winningCondition
    }

    set winningCondition(winningCondition: WinningConditionName) {
        this._winningCondition = winningCondition
    }
}

export default CurrentGameDto
