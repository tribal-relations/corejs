import CurrentGame from './CurrentGame.ts'

class StartGameManager {
    start(): CurrentGame {
        return this.startGame(this.createNewGame(this.generateGameName()))
    }

    private createNewGame(name: string): CurrentGame {
        return new CurrentGame(
            Object(),
            0,
            name,
            new Date(),
        )
    }

    private startGame(game: CurrentGame): CurrentGame {
        game.isStarted = true

        return game
    }

    private generateGameName(name: string = ''): string {
        const today = (new Date()).toString()
        return `${name}${today}`
    }
}

export default StartGameManager
