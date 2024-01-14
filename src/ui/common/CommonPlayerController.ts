import Player from '../../domain/entity/Player.ts'
import Tribe from '../../domain/entity/Tribe.ts'
import TribeName from '../../domain/enum/TribeName.ts'

class CommonPlayerController {
    public createPlayers(playerNames: string[]): Record<string, Player> {
        const players = {}
        const tribeNames = (Object as any).values(TribeName).slice(0, playerNames.length)

        for (let i = 0; i < playerNames.length; i++) {
            players[playerNames[i]] = new Player(
                new Tribe(tribeNames[i]),
                playerNames[i],
            )
        }
        return players
    }
}

export default CommonPlayerController
