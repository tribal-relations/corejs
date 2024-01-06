class TribeNotFound extends Error {
    constructor(tribeName: string) {
        super(`Tribe with name '${tribeName}' not found.`)
    }
}

export default TribeNotFound
