import type CurrentGame from '../../app/CurrentGame.ts'
import type CommonPlayerController from '../common/CommonPlayerController'
import type RelationRoundManager from '../console/RelationRoundManager'
import type RoundManager from '../console/RoundManager'

class WebUi {
    constructor(
        private readonly _roundManager: RoundManager,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _playerController: CommonPlayerController,
        private readonly _currentGame: CurrentGame,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public startTurns(names: string[]): void {
        this.makeFirstOneTimeSetup(names)
    }

    private makeFirstOneTimeSetup(names: string[]) {
        this._playerController.createPlayers(names)
        this._relationRoundManager.setStarterRelationsFromGame(this.game)
    }
}

export default WebUi
