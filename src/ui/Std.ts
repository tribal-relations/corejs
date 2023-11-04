import prompt from 'prompt-sync'
import { singleton } from 'tsyringe'

@singleton()
class Std {
    private readonly _cin
    private readonly _inputBuffer: string[] = []
    private _inputBufferIndex: number = 0

    constructor() {
        this._cin = prompt()
    }

    out(...data: any[]): void {
        if (process.env.NODE_ENV === 'test') {
            return
        }
        console.log(...data)
    }

    outEmptyLine(): void {
        console.log('\n')
    }

    in(prompt: string = '', defaultValue: string | null = null): string | null {
        const buffer = this.readFromBufferIfTest()
        if (buffer) {
            return buffer
        }

        if (defaultValue) {
            return this._cin(prompt, defaultValue)
        }
        return this._cin(prompt)
    }

    readFromBufferIfTest(): string | null {
        if (process.env.NODE_ENV === 'test') {
            if (this._inputBufferIndex >= this._inputBuffer.length) { // if no elements left, quit game
                return 'q'
            }
            return this._inputBuffer[this._inputBufferIndex++ % this._inputBuffer.length]
        }
        return null
    }

    sendIn(input: string): void {
        this._inputBuffer.push(input)
    }
}

export default Std
