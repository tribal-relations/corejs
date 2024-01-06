import type Player from './Player.ts'
import type Tribe from './Tribe'
import type Turn from './Turn.ts'
import type WinningCondition from './WinningCondition.ts'
import PlayerNotFound from '../../exception/PlayerNotFound'
import TribeNotFound from '../../exception/TribeNotFound'
import type TribeName from '../enum/TribeName'

class Game {
    public static readonly maxPlayers = 20

    constructor(
        private _players: Player[],
        private _name: string,
        private _startDate: Date = new Date(),
        private _endDate: Date | null = null,
        private _currentTurnNumber: number = 1,
        private _currentTurn: Turn | null = null,
        private _currentRoundNumber: number = 1,
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

    get currentRoundNumber(): number {
        return this._currentRoundNumber
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

    public getPlayer(playerName: string): Player {
        // because we store players in an array. maybe map would be better
        for (const playerInstance: Player of this.players) {
            if (playerName === playerInstance.name) {
                return playerInstance
            }
        }
        throw new PlayerNotFound(playerName, this.name)
    }

    public getTribe(tribeName: TribeName): Tribe {
        // because we store players in an array. maybe map would be better
        for (const playerInstance: Player of this.players) {
            if (tribeName === playerInstance.tribe.name) {
                return playerInstance.tribe
            }
        }
        throw new TribeNotFound(tribeName)
    }

    nextRound(): void {
        this._currentRoundNumber++
    }
}

export default Game
