import ConsoleException from './ConsoleException.ts'

class BufferEmpty extends ConsoleException {
    constructor() {
        super('Buffer is empty. Quitting.')
    }
}

export default BufferEmpty
