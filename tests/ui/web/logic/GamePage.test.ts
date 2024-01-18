import CurrentGame from '../../../../src/app/CurrentGame.ts'
import { container } from '../../../../src/NaiveDiContainer.ts'
import GamePage from '../../../../src/ui/web/logic/GamePage.ts'

test('can run onStartClick', () => {
    const gamePage: GamePage = container.resolveSafely(GamePage)

    gamePage.onStartClick(gamePage.defaultPlayerNames)

    const playerName = gamePage.defaultPlayerNames[0]
    const tribe = gamePage.game.players[playerName].tribe
    // expect game
    expect(gamePage.game).toBeInstanceOf(CurrentGame)

    // expect players
    expect(gamePage.game.playersLength).toBe(4)
    expect(Object.values(gamePage.game.players).length).toBe(4)

    // expect relations
    expect(gamePage.game.playersLength).toBe(4)

    expect(Object.values(gamePage.relationsManager.relations).length).toBe(4)
    expect(Object.values(gamePage.relationsManager.relations[tribe.name]).length).toBe(4 - 1)
})
