import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import Currency from '../../../src/domain/entity/Currency.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import ActionRepository from '../../../src/domain/repository/ActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('action constraints must be respected', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty()
    const player = new Player(tribe)
    const turn = new Turn(player)
    expect(tribe.tiles.length).toBe(0)

    expect(tribe.population).toStrictEqual(0)
    const action = ActionRepository.createFromName(ActionName.Expedition)

    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }

    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' cannot perform action '${action.name}', because it does not satisfy action constraints. (Insufficient ${Currency.Population})`,
    )
    expect(tribe.tiles.length).toBe(0)
})
