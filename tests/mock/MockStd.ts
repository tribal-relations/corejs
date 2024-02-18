import { Console } from 'node:console'
import { Transform } from 'node:stream'
import BufferEmpty from '../../src/exception/console/BufferEmpty.ts'
import Std from '../../src/ui/console/io/Std.ts'

class MockStd extends Std {
    private _isSilent: boolean = true
    private readonly _inputBuffer: string[] = []
    private readonly _outputBuffer: string[] = []
    private _inputBufferIndex: number = 0
    private readonly _transform
    private readonly _logger

    constructor() {
        super()
        this._transform = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
        this._logger = new Console({ stdout: this._transform })
    }

    public silent(): void {
        this._isSilent = true
    }

    public verbose(): void {
        this._isSilent = false
    }

    public out(...data: any[]): void {
        this._outputBuffer.push(data.join('\n'))
        if (this._isSilent) {
            return
        }
        super.out(...data)
    }

    public outTable(data: object | any[]): void {
        this._outputBuffer.push(this.getTableAsString(data))
        if (this._isSilent) {
            return
        }
        super.outTable(...data)
    }

    private getTableAsString(data): string {
        this._logger.table(data)
        return (this._transform.read() || '').toString()
    }

    public getFullOutputAsString(): string {
        return this._outputBuffer.join('\n')
    }

    public in(_prompt: string = '', _defaultValue: string | null = null): string | null {
        return this.readFromBufferIfTest()
    }

    public readFromBufferIfTest(): string {
        if (this._inputBufferIndex === this._inputBuffer.length) { // if we read next-after-last, send quit action
            return 'q'
        }
        if (this._inputBufferIndex > this._inputBuffer.length) { // if no elements left, quit game forcefully to avoid loop
            throw new BufferEmpty()
        }
        return this._inputBuffer[this._inputBufferIndex++]
    }

    public sendIn(input: string): void {
        this._inputBuffer.push(input)
    }
}

export default MockStd
