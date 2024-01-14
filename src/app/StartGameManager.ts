import Game from '../domain/entity/Game.ts'

class StartGameManager {
    start(): Game {
        return this.startGame(this.createNewGame(this.generateGameName()))
    }

    private createNewGame(name: string): Game {
        return new Game(
            Object(),
            0,
            name,
            new Date(),
        )
    }

    private startGame(game: Game): Game {
        game.isStarted = true

        return game
    }

    private generateGameName(name: string = ''): string {
        const today = (new Date()).toString()
        return `${name}${today}`
    }
}

export default StartGameManager
