import type Game from '../../domain/entity/Game.ts'
import GameNotYetCreated from '../../exception/GameNotYetCreated'
import type CommonPlayerController from '../common/CommonPlayerController'
import type RelationRoundManager from '../console/RelationRoundManager'
import type RoundManager from '../console/RoundManager'

class WebUi {
    _game: Game | undefined

    constructor(
        private readonly _roundManager: RoundManager,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _playerController: CommonPlayerController,
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
        this._playerController.game = game
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
