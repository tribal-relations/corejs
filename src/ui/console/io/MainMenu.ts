import type Std from './Std.ts'
import type GameRules from '../../common/GameRules'

class MainMenu {
    private readonly _menu = {
        s: 'Start new game',
        r: 'Print rules',
        q: 'Quit',
    }

    constructor(
        private readonly _std: Std,
        private readonly _gameRules: GameRules,
    ) {
    }

    public start(): boolean {
        this.printMenu()

        let option = 'q'

        for (; option !== 's';) {
            option = this._std.in('choice>', 'q') ?? 'q'

            if (option === 'q') {
                return false
            }

            if (option === 'r') {
                this.printRules()
            }
            if (option === '?') {
                this.printMenu()
            }
        }
        return true
    }

    private printMenu(): void {
        this._std.outHeading('~~~ TRIBAL RELATIONS ~~~')
        this._std.outHeading('[MAIN MENU]')

        this._std.outTable(this._menu)
    }

    private printRules(): void {
        this._std.outHeading('[RULES]')
        this._std.outTable(this._gameRules.rules)
    }
}

export default MainMenu
