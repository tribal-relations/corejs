import fs from 'fs'
import type SaveDto from './dto/SaveDto'

class SaveWriter {
    private readonly saveFileDir = '~/Documents/tribal-relations/saves/'

    public write(save: SaveDto, filename: null | undefined | string = null): void {
        const saveAsString = this.serializeDto(save)
        if (!filename) {
            filename = this.getFilename(save)
        }
        fs.writeFileSync(filename, saveAsString)
    }

    private getFilename(save: SaveDto): string {
        const saveDate = save.createdAt.getTime() / 1000
        const gameStartedDate = save.currentGameDto.specificGame.startDate.getTime() / 1000
        const filename = `${saveDate}_game_${save.currentGameDto.specificGame.name}_from_${gameStartedDate}.json`
        return this.saveFileDir + filename
    }

    private serializeDto(save: SaveDto): string {
        return JSON.stringify(save)
    }
}

export default SaveWriter
