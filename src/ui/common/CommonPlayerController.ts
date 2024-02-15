import type TribeManager from '../../app/TribeManager'
import Player from '../../domain/entity/Player.ts'
import Tribe from '../../domain/entity/Tribe.ts'
import TribeName from '../../domain/enum/TribeName.ts'
import Rand from '../../domain/helper/Rand.ts'

class CommonPlayerController {
    public constructor(
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public createPlayers(playerNames: string[]): Record<string, Player> {
        const players = {}
        const tribeNames: TribeName[] = this.getRandomTribeNames(playerNames.length)

        for (let i = 0; i < playerNames.length; ++i) {
            players[playerNames[i]] = new Player(
                new Tribe(tribeNames[i]),
                playerNames[i],
            )
            this._tribeManager.createStarterTribe(players[playerNames[i]].tribe)
        }
        return players
    }

    private getRandomTribeNames(length: number): TribeName[] {
        return Rand.chooseManyWithoutRepeatsFromEnum(TribeName, length)
    }
}

export default CommonPlayerController
