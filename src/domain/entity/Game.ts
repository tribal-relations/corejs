import type Player from './Player'
import type Turn from './Turn'
import type WinningCondition from './WinningCondition'

class Game {
    public static readonly maxPlayers = 20

    constructor(
        private _players: Player[],
        private _name: string,
        private _startDate: Date = new Date(),
        private _endDate: Date | null = null,
        private _currentTurnNumber: number = 1,
        private _currentTurn: Turn | null = null,
        private _isStarted: boolean = false,
        private _isFinished: boolean = false,
        private _winner: Player | null = null,
        private _winningCondition: WinningCondition | null = null,
    ) {
    }

    get players(): Player[] {
        return this._players
    }

    set players(players: Player[]) {
        this._players = players
    }

    get startDate(): Date {
        return this._startDate
    }

    set startDate(startDate: Date) {
        this._startDate = startDate
    }

    get endDate(): Date | null {
        return this._endDate
    }

    set endDate(endDate: Date) {
        this._endDate = endDate
    }

    get currentTurnNumber(): number {
        return this._currentTurnNumber
    }

    set currentTurnNumber(n: number) {
        this._currentTurnNumber = n
    }

    get currentTurn(): Turn | null {
        return this._currentTurn
    }

    set currentTurn(t: Turn) {
        this._currentTurn = t
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
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

    get winner(): Player | null {
        return this._winner
    }

    set winner(winner: Player) {
        this._winner = winner
    }

    get winningCondition(): WinningCondition | null {
        return this._winningCondition
    }

    set winningCondition(winningCondition: WinningCondition) {
        this._winningCondition = winningCondition
    }

    addPlayer(player: Player): void {
        this.players.push(player)
    }
}

export default Game
