import type Player from './Player.ts'
import type Tribe from './Tribe'
import type WinningCondition from './WinningCondition.ts'
import PlayerNotFound from '../../exception/not-found/PlayerNotFound'
import TribeNotFound from '../../exception/not-found/TribeNotFound'
import type TribeName from '../enum/TribeName'

class SpecificGame {
    private _players: Record<string, Player> = Object()

    constructor(
        private _name: string,
        private _startDate: Date = new Date(),
        private _endDate: Date | null = null,
        private _isStarted: boolean = false,
        private _isFinished: boolean = false,
        private _winner: Player | null = null,
        private _winningCondition: WinningCondition | null = null,
    ) {
    }

    get players(): Record<string, Player> {
        return this._players
    }

    set players(players: Record<string, Player>) {
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

    public getPlayer(playerName: string): Player {
        if (playerName in this.players) {
            return this.players[playerName]
        }

        throw new PlayerNotFound(playerName, this.name)
    }

    public getTribe(tribeName: TribeName): Tribe {
        for (const name: string of this.players) {
            if (tribeName === this.players[name].tribe.name) {
                return this.players[name].tribe
            }
        }
        throw new TribeNotFound(tribeName)
    }
}

export default SpecificGame
