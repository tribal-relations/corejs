import 'reflect-metadata'
import { container } from 'tsyringe'
import MainMenu from '../../../src/ui/console/MainMenu'
import Std from '../../../src/ui/Std'
import MockStd from '../../mock/MockStd'

test('main menu', async () => {
    container.register<Std>(Std, MockStd)

    const mockStd = container.resolve(MockStd)
    const mainMenu = new MainMenu(mockStd)

    mainMenu.start()

    const hardcoded =
        ' ~~~ TRIBAL RELATIONS ~~~\n' +
        '       [MAIN MENU]    \n' +
        's) Start new game\n' +
        'r) Print rules\n' +
        'q) Quit\n'
    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})
