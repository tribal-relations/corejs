import InternalException from './InternalException'

class InvalidFactoryOption extends InternalException {
    constructor(one: string, two: string) {
        super(`Use either ${one} or ${two}, not both.`)
    }
}

export default InvalidFactoryOption
