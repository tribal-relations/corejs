import Std from '../../src/ui/Std.ts'


class MockStd extends Std {
    private _isSilent: boolean = true
    private readonly _inputBuffer: string[] = []
    private readonly _outputBuffer: string[] = []
    private _inputBufferIndex: number = 0

    public silent(): void {
        this._isSilent = true
    }

    public verbose(): void {
        this._isSilent = false
    }

    out(...data: any[]): void {
        this._outputBuffer.push(data.join('\n'))
        if (this._isSilent) {
            return
        }
        console.log(...data)
    }

    public getFullOutputAsString(): string {
        return this._outputBuffer.join('\n')
    }

    in(_prompt: string = '', _defaultValue: string | null = null): string | null {
        return this.readFromBufferIfTest()
    }

    readFromBufferIfTest(): string {
        if (this._inputBufferIndex >= this._inputBuffer.length) { // if no elements left, quit game
            return 'q'
        }
        return this._inputBuffer[this._inputBufferIndex++]
    }

    sendIn(input: string): void {
        this._inputBuffer.push(input)
    }
}

export default MockStd
