import { container } from '../../../src/NaiveDiContainer.ts'
import MainMenu from '../../../src/ui/console/MainMenu.ts'
import MockStd from '../../mock/MockStd.ts'

test('main menu', async () => {
    // container.setMock(Std, new MockStd())

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
