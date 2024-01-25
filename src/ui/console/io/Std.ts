import prompt from 'prompt-sync'

class Std {
    static spacer = '\t\t\t'
    private readonly _cin

    constructor() {
        this._cin = prompt()
    }

    public out(...data: any[]): void {
        // eslint-disable-next-line
        console.log(...data)
    }

    public outHeading(...data): void {
        this.outL(Std.spacer, ...data)
    }

    public outSpacer(...data): void {
        this.out(Std.spacer, ...data)
    }

    public outL(...data: any[]): void {
        this.out(...data)
        this.outEmptyLine()
    }

    public outTable(data: object | any[]): void {
        // eslint-disable-next-line
        console.table(data)
    }

    public outEmptyLine(): void {
        this.out('\n')
    }

    public in(prompt: string = '', defaultValue: string | null = null): string | null {
        if (defaultValue) {
            return this._cin(prompt, defaultValue)
        }
        return this._cin(prompt)
    }

    public sendIn(_input: string): void {
    }
}

export default Std
