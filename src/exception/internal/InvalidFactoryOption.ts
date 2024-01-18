import InternalException from './InternalException.ts'

class InvalidFactoryOption extends InternalException {
    constructor(one: string, two: string) {
        super(`Use either ${one} or ${two}, not both.`)
    }
}

export default InvalidFactoryOption
