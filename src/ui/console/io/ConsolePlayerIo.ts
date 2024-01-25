import type Std from './Std.ts'
import CurrentGame from '../../../app/CurrentGame.ts'
import type CommonPlayerController from '../../common/CommonPlayerController'

class ConsolePlayerIo {
    constructor(
        private readonly _std: Std,
        private readonly _commonPlayerController: CommonPlayerController,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    public updatePlayers(): void {
        this._std.outHeading('[ADDING PLAYERS]')
        this._std.out('Players must have unique names.')

        const playerNames: string[] = []
        let playerName: string
        for (; true;) {
            for (let i = 1; i <= CurrentGame.maxPlayers; i++) {
                this._std.outSpacer(`Adding player ${i}/${CurrentGame.maxPlayers}`)

                playerName = this._std.in(`Enter player ${i} name (or return to end adding players)>`) ?? `player ${i}`
                if (!playerName || playerName === '\n') {
                    break
                }
                playerNames.push(playerName)
            }
            if (playerNames.length !== 0) {
                break
            }
        }
        this._currentGame.players = this._commonPlayerController.createPlayers(playerNames)
        this._currentGame.playersLength = Object.keys(this._currentGame.players).length
    }

    public outputPlayersWithTribes(): void {
        const table = {}
        for (const playerName in this._currentGame.players) {
            table[playerName] = {
                Tribe: this._currentGame.players[playerName].tribe.name,
            }
        }
        this._std.outTable(table)
    }
}

export default ConsolePlayerIo
