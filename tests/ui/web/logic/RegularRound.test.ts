import { container } from '../../../../src/NaiveDiContainer.ts'
import GamePage from '../../../../src/ui/web/logic/GamePage.ts'
import RegularRound from '../../../../src/ui/web/logic/RegularRound.ts'

test('can run howManyActionsCanTribePerformThisTurn', () => {
    const gamePage: GamePage = container.resolveSafely(GamePage)
    const regularRound: RegularRound = container.resolveSafely(RegularRound)
    gamePage.onStartClick(gamePage.defaultPlayerNames)

    const playerName = gamePage.defaultPlayerNames[0]
    const tribe = regularRound.game.players[playerName].tribe

    const defaultActionCount = regularRound.howManyActionsCanTribePerformThisTurn(tribe)

    expect(defaultActionCount).toBe(1)
})
