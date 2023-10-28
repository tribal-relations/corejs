import Player from "../entity/player";
import Tribe from "../entity/tribe";
import Population from "../entity/population";
import Territory from "../entity/territory";
import Game from "../entity/game";
import {singleton} from "tsyringe";

@singleton()
class StartGameManager {
    constructor() {
    }

    createNewGame(name: string, playerNames: Array<string>): Game {
        const game = new Game(
            this.createPlayers(playerNames),
            name,
            new Date(),
        )
        return game
    }

    startGame(game: Game): Game {
        game.isStarted = true

        return game
    }

    createPlayers(playerNames: Array<string>): Array<Player> {
        let players = []
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

    start(names: Array<string>, name: string = ''): Game {
        return this.startGame(this.createNewGame(this.generateGameName(name), names))
    }

    generateGameName(name: string = ''): string {
        const today = (new Date()).toString()
        return `${name}${today}`
    }
}

export default StartGameManager