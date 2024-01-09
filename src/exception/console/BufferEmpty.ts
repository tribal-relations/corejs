import ConsoleException from './ConsoleException'

class BufferEmpty extends ConsoleException {
    constructor() {
        super('Buffer is empty. Quitting.')
    }
}

export default BufferEmpty
