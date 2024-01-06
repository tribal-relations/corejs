class InvalidFactoryOption extends Error {
    constructor(one: string, two: string) {
        super(`Use either ${one} or ${two}, not both.`)
    }
}

export default InvalidFactoryOption
