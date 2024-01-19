import Tribe from '../../../../src/domain/entity/Tribe.ts'
import TribeName from '../../../../src/domain/enum/TribeName.ts'
import { container } from '../../../../src/NaiveDiContainer.ts'
import ActionInfo from '../../../../src/ui/web/logic/ActionInfo.ts'
import GamePage from '../../../../src/ui/web/logic/GamePage.ts'

test('can run getCurrentTribeNames', () => {
    const gamePage: GamePage = container.resolveSafely(GamePage)
    const actionInfo: ActionInfo = container.resolveSafely(ActionInfo)
    gamePage.onStartClick(gamePage.defaultPlayerNames)

    const tribeNames = gamePage.game.specificGame.tribeNames

    expect(tribeNames.length).toStrictEqual(gamePage.defaultPlayerNames.length)

    for (let i = 0; i < tribeNames.length; ++i) {
        expect(tribeNames[i] in TribeName).toBeTruthy()
    }
})

test('can run getTribeResourceNamesByTribeName', () => {
    const gamePage: GamePage = container.resolveSafely(GamePage)
    const actionInfo: ActionInfo = container.resolveSafely(ActionInfo)
    gamePage.onStartClick(gamePage.defaultPlayerNames)

    const playerName = gamePage.defaultPlayerNames[0]
    const tribe = actionInfo.game.players[playerName].tribe

    const defaultResourceNames = actionInfo.getTribeResourceNamesByTribeName(tribe.name)

    expect(defaultResourceNames).toStrictEqual([
        'Pasture',
        'Forest',
    ])
})

test('can run getPossibleTechnologiesForTribe', () => {
    const actionInfo: ActionInfo = container.resolveSafely(ActionInfo)
    const tribe = new Tribe(TribeName.Achaeans)

    const defaultPossibleTechs = actionInfo.getPossibleTechnologyNamesForTribe(tribe)

    expect(defaultPossibleTechs).toStrictEqual([
        'Pottery',
        'Animal Husbandry',
        'Hunting',
        'Fishing',
        'Archery',
        'Musical Instruments',
        'Poetry',
        'Stone Working',
    ])
})
