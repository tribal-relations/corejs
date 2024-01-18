import Player from '../../domain/entity/Player.ts'
import Tribe from '../../domain/entity/Tribe.ts'
import TribeName from '../../domain/enum/TribeName.ts'
import Rand from '../../domain/helper/Rand.ts'

class CommonPlayerController {
    public createPlayers(playerNames: string[]): Record<string, Player> {
        const players = {}
        const tribeNames: TribeName[] = this.getRandomTribeNames(playerNames.length)

        for (let i = 0; i < playerNames.length; ++i) {
            players[playerNames[i]] = new Player(
                new Tribe(tribeNames[i]),
                playerNames[i],
            )
        }
        return players
    }

    private getRandomTribeNames(length: number): TribeName[] {
        return Rand.chooseManyWithoutRepeatsFromEnum(TribeName, length)
    }
}

export default CommonPlayerController
