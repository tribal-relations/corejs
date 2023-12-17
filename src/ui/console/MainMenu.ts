import { singleton } from 'tsyringe'
import Std from '../Std.ts'

@singleton()
class MainMenu {
    constructor(
        private readonly _std: Std,
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
            's) Start new game\n' +
            'r) Print rules\n' +
            'q) Quit\n'

        this._std.out(menu)
    }

    private printRules(): void {
        const rules =
            '       [RULES]    \n' +
            'You play as a tribe. To win, you must conquer the city in the center of the map.\n' +
            'Other tribes will attempt to do the same.\n' +
            'You can ally with them or oppose them.\n' +
            'Choose wisely!\n\n' +
            'The game will block any impossible action. Try and see if you can learn the rules by playing!'

        this._std.out(rules)
    }
}

export default MainMenu
