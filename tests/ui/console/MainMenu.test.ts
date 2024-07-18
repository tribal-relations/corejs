import { expect, test } from 'vitest'
import { container } from '../../../src/NaiveDiContainer.ts'
import MainMenu from '../../../src/ui/console/io/MainMenu.ts'
import Std from '../../../src/ui/console/io/Std.ts'

test('main menu', async () => {
    const mockStd = container.resolveSafely(Std)
    const mainMenu = container.resolveSafely(MainMenu)

    mainMenu.start()

    const hardcoded = '┌─────────┬──────────────────┐\n' +
                      '│ (index) │ Values           │\n' +
                      '├─────────┼──────────────────┤\n' +
                      '│ s       │ \'Start new game\' │\n' +
                      '│ r       │ \'Print rules\'    │\n' +
                      '│ q       │ \'Quit\'           │\n' +
                      '└─────────┴──────────────────┘\n'
    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})
