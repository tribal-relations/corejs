import { singleton } from 'tsyringe'
import Game from '../domain/entity/Game'
import Player from '../domain/entity/Player'
import Population from '../domain/entity/Population'
import Territory from '../domain/entity/Territory'
import Tribe from '../domain/entity/Tribe'

@singleton()
class StartGameManager {
    start(names: string[], name: string = ''): Game {
        return this.startGame(this.createNewGame(this.generateGameName(name), names))
    }

    private createNewGame(name: string, playerNames: string[]): Game {
        const game = new Game(
            this.createPlayers(playerNames),
            name,
            new Date(),
        )
        return game
    }

    private startGame(game: Game): Game {
        game.isStarted = true

        return game
    }

    private createPlayers(playerNames: string[]): Player[] {
        const players = []
        const tribeNames = Tribe.tribeNames.slice(0, playerNames.length)

        for (let i = 0; i < playerNames.length; i++) {
            players[i] = new Player(
                new Tribe(
                    tribeNames[i],
                    0,
                    0,
                    Population.createStarterPopulation(),
                    Territory.createStarterTerritory(),
                ),
                playerNames[i],
            )
        }
        return players
    }

    private generateGameName(name: string = ''): string {
        const today = (new Date()).toString()
        return `${name}${today}`
    }
}

export default StartGameManager
