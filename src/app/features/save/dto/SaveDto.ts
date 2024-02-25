import type CurrentGame from '../../../CurrentGame.ts'

class SaveDto {
    constructor(
        // private readonly _currentGameDto: CurrentGameDto,
        private readonly _currentGameDto: CurrentGame,

        private readonly _createdAt: Date = new Date(),
    ) {
    }

    static createFromCurrentGame(game: CurrentGame): SaveDto {
        const dto = new SaveDto(
            // CurrentGameDto.createFromCurrentGame(game),
            game,
        )

        return dto
    }

    get currentGameDto(): CurrentGame {
        return this._currentGameDto
    }

    get createdAt(): Date {
        return this._createdAt
    }
}

export default SaveDto
