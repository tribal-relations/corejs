import type Std from './Std.ts'
import type GameRules from '../../common/GameRules'

class MainMenu {
    private readonly _menu = [
        's) Start new game',
        'r) Print rules',
        'q) Quit',
    ]

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
        const menu =
            ' ~~~ TRIBAL RELATIONS ~~~\n' +
            '       [MAIN MENU]    \n' +
            this._menu.join('\n')

        this._std.out(menu)
    }

    private printRules(): void {
        const rules = '       [RULES]    \n' +
            this._gameRules.rules.join('\n') +
            '\n'

        this._std.out(rules)
    }
}

export default MainMenu
