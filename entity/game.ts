import Player from "./player";
import WinningCondition from "./winning-condition"
import Tribe from "./tribe"
import Population from "./population"
import Territory from "./territory";

class Game {
    constructor(
        private players: Array<Player>,
        private startDate: Date,
        private endDate: Date,
        private name: string,
        private isFinished: boolean,
        private winner: Player,
        private winningCondition: WinningCondition,
    ) {
    }

    static startNewGame(name: string, playerNames: Array<string>): Game {
        return new Game(
            Game.createPlayers(playerNames),
            new Date(),
            null,
            name,
            false,
            null,
            null,
        )

    }

    static createPlayers(playerNames: Array<string>): Array<Player> {
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


    finish() {
        this.isFinished = true
        this.endDate = new Date()
        this.winningCondition = this.calculateWinningCondition()
        this.winner = this.calculateWinner()
    }

    calculateWinningCondition(): WinningCondition {
        // TODO: implement
        return WinningCondition.createFromName(WinningCondition.winningConditionMilitaryName)
    }

    calculateWinner(): Player {
        if (this.winningCondition == null) {
            return null
        }
        // TODO: implement
        return this.players[0]
    }
}




