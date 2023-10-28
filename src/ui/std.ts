import {singleton} from "tsyringe";
import prompt from 'prompt-sync'

@singleton()
class Std {
    private readonly _cin
    private _inputBuffer: Array<string> = []
    private _inputBufferIndex: number = 0

    constructor() {
        this._cin = prompt()
    }

    out(...data: any[]) {
        console.log(...data)
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
            if (this._inputBufferIndex >= this._inputBuffer.length) {
                throw new Error('index out of bounds')
            }
            return this._inputBuffer[this._inputBufferIndex++ % this._inputBuffer.length]
        }
        return null
    }

    sendIn(input: string) {
        this._inputBuffer.push(input)
    }
}

export default Std