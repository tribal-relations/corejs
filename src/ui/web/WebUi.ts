import type CurrentGame from '../../app/CurrentGame.ts'
import type CommonPlayerController from '../common/CommonPlayerController'
import type RelationRoundManager from '../console/RelationRoundManager'
import type RoundManager from '../console/RoundManager'

/**
 * @deprecated
 */
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
}

export default WebUi
