import type Std from './Std.ts'
import CurrentGame from '../../app/CurrentGame.ts'
import type TurnManager from '../../app/TurnManager.ts'
import type CommonPlayerController from '../common/CommonPlayerController'

class ConsolePlayerController {
    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _std: Std,
        private readonly _commonPlayerController: CommonPlayerController,
        private readonly _currentGame: CurrentGame,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get std(): Std {
        return this._std
    }

    public updatePlayers(): void {
        this.std.out('Adding players')
        this.std.out('Players must have unique names.')

        const playerNames: string[] = []
        let playerName: string
        for (; true;) {
            for (let i = 1; i <= CurrentGame.maxPlayers; i++) {
                this.std.out(`Adding player ${i}/${CurrentGame.maxPlayers}`)

                playerName = this.std.in(`Enter player ${i} name (or return to end adding players)>`) ?? `player ${i}`
                if (!playerName || playerName === '\n') {
                    break
                }
                playerNames.push(playerName)
            }
            if (playerNames.length !== 0) {
                break
            }
        }
        this.game.players = this._commonPlayerController.createPlayers(playerNames)
        this.game.playersLength = Object.keys(this.game.players).length
    }

    public outputPlayersWithTribes(): void {
        let line: string

        for (const playerName in this.game.players) {
            line = `\t${playerName}\t-\tTribe '${this.game.players[playerName].tribe.name}'`
            this._std.out(line)
        }
    }
}

export default ConsolePlayerController
