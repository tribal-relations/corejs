import prompt from 'prompt-sync'

class Std {
    private readonly _cin

    constructor() {
        this._cin = prompt()
    }

    out(...data: any[]): void {
        // eslint-disable-next-line
        console.log(...data)
    }

    outEmptyLine(): void {
        this.out('\n')
    }

    in(prompt: string = '', defaultValue: string | null = null): string | null {
        if (defaultValue) {
            return this._cin(prompt, defaultValue)
        }
        return this._cin(prompt)
    }

    sendIn(_input: string): void {
    }
}

export default Std
