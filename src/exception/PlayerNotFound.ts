class PlayerNotFound extends Error {
    constructor(playerName: string, gameName: string) {
        super(`Player with name "${playerName}" not found in this game "${gameName}".`)
    }
}

export default PlayerNotFound
