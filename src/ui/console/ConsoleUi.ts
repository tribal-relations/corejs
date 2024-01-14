import type ConsoleCommandPerformer from './ConsoleCommandPerformer.ts'
import type ConsolePlayerController from './ConsolePlayerController'
import type RelationRoundManager from './RelationRoundManager'
import type RoundManager from './RoundManager.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type TurnResult from '../../app/TurnResult.ts'

class ConsoleUi {
    constructor(
        private readonly _roundManager: RoundManager,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerController: ConsolePlayerController,
        private readonly _currentGame: CurrentGame,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
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
