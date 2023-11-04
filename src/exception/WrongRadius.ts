class WrongRadius extends Error {
    constructor(tribeName: string, radius: number, actionName: string) {
        super(`Tribe '${tribeName}' has not yet reached radius ${radius} necessary to perform action '${actionName}'.`)
    }
}

export default WrongRadius
