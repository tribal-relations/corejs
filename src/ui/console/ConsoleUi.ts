import type ConsoleCommandPerformer from './ConsoleCommandPerformer.ts'
import type PlayerController from './PlayerController'
import type RelationRoundManager from './RelationRoundManager'
import type RoundManager from './RoundManager.ts'
import type TurnResult from '../../app/TurnResult.ts'
import type Game from '../../domain/entity/Game.ts'
import GameNotYetCreated from '../../exception/GameNotYetCreated'

class ConsoleUi {
    _game: Game | undefined

    constructor(
        private readonly _roundManager: RoundManager,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerController: PlayerController,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new GameNotYetCreated()
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
        this._roundManager.game = game
        this._consoleCommandPerformer.game = game
        this._playerController.game = game
    }

    public startTurns(): TurnResult {
        this.makeFirstOneTimeSetup()

        return this._roundManager.startRounds()
    }

    private makeFirstOneTimeSetup() {
        this._playerController.updatePlayers()
        this._relationRoundManager.setStarterRelationsFromGame(this.game)
        this._playerController.outputPlayersWithTribes()
        this._consoleCommandPerformer.outputAvailableCommands()
        this._consoleCommandPerformer.outputAvailableActions()
    }
}

export default ConsoleUi
