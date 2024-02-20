import type CurrentGameDto from './CurrentGameDto.ts'

class SaveDto {
    constructor(
        private readonly _currentGameDto: CurrentGameDto,
        private readonly _createdAt: Date = new Date(),
    ) {
    }

    get currentGameDto(): CurrentGameDto {
        return this._currentGameDto
    }

    get createdAt(): Date {
        return this._createdAt
    }
}

export default SaveDto
