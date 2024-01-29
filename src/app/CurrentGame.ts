import type GameplayAction from '../domain/entity/action/GameplayAction.ts'
import type Player from '../domain/entity/Player.ts'
import SpecificGame from '../domain/entity/SpecificGame.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import type Turn from '../domain/entity/Turn.ts'
import type TribeName from '../domain/enum/TribeName.ts'
import GameplayActionRepository from '../domain/repository/GameplayActionRepository.ts'

class CurrentGame {
    public static readonly maxPlayers = 20
    private readonly _specificGame: SpecificGame
    private _playersLength: number = 4
    private _currentTurnNumber: number = 0
    private _currentTurn: Turn | null = null
    private _currentRoundNumber: number = 1

    constructor() {
        this._specificGame = new SpecificGame((new Date()).toString())
    }

    get possibleActions(): GameplayAction[] {
        // TODO synchronize with cli version
        return Object.values(GameplayActionRepository.getAll())
    }

    get specificGame(): SpecificGame {
        return this._specificGame
    }

    get players(): Record<string, Player> {
        return this._specificGame.players
    }

    set players(players: Record<string, Player>) {
        this._specificGame.players = players
    }

    get playersLength(): number {
        return this._playersLength
    }

    set playersLength(len: number) {
        this._playersLength = len
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

    public addPlayer(player: Player): void {
        this.players[player.name] = player
    }

    public getPlayer(playerName: string): Player {
        return this._specificGame.getPlayer(playerName)
    }

    public getTribe(tribeName: TribeName): Tribe {
        return this._specificGame.getTribe(tribeName)
    }

    nextRound(): void {
        this._currentRoundNumber++
    }

    nextHalfRound() {
        this._currentRoundNumber += 0.5
    }
}

export default CurrentGame
