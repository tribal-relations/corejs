import type CurrentGame from '../../../app/CurrentGame.ts'
import type RelationsManager from '../../../app/RelationsManager.ts'
import type TurnManager from '../../../app/TurnManager.ts'
import TurnResult from '../../../app/TurnResult.ts'
import type Player from '../../../domain/entity/Player.ts'
import type Turn from '../../../domain/entity/Turn.ts'
import type CommonPlayerController from '../../common/CommonPlayerController.ts'
import type RelationRoundManager from '../../console/RelationRoundManager.ts'

class GamePage {
    public readonly defaultPlayerNames = [
        'John',
        'Jane',
        'Jack',
        'Joe',
    ]

    constructor(
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _playerController: CommonPlayerController,
        private readonly _currentGame: CurrentGame,
        private readonly _turnManager: TurnManager,
        private readonly _relationsManager: RelationsManager,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get relationsManager(): RelationsManager {
        return this._relationsManager
    }

    public onStartClick(playerNames: string[]) {
        this.validateNames(playerNames)

        this.makeFirstOneTimeSetup(playerNames)

        const nextTurn = this._turnManager.nextTurn(this.game)
        const turnResult = this.doAllPlayerActions(nextTurn)
    }

    private doAllPlayerActions(nextTurn: Turn): TurnResult {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(nextTurn.player.tribe.name) + 1,
            1,
        )

        let turnResult: TurnResult
        for (let i = 0; i < totalActions; ++i) {
            turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)
        }

        return turnResult
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        return new TurnResult()
    }

    private validateNames(playerNames: string[]): void {

    }

    private makeFirstOneTimeSetup(names: string[]) {
        this.game.players = this._playerController.createPlayers(names)
        this._relationRoundManager.setStarterRelationsFromGame(this.game)
    }
}

export default GamePage