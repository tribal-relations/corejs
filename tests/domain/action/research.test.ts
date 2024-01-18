import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import ResearchPlayerAction from '../../../src/domain/entity/action/ResearchPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import TechnologyRepository from '../../../src/domain/repository/TechnologyRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('research adds technology', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const playerAction = new ResearchPlayerAction(player.tribe, TechnologyRepository.createFromName(TechnologyName.Pottery))
    const turnResult = turnDecisionManager.processTurn(playerAction, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })
})

test('cannot research blocked technology', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const techName = 'Advanced Writing'

    const throwingFunction = (): void => {
        const playerAction = new ResearchPlayerAction(player.tribe, TechnologyRepository.createFromName(TechnologyName.AdvancedWriting))
        const turnResult = turnDecisionManager.processTurn(playerAction, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({})
    }
    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
})

test('cannot research already known technology', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const techName = 'Pottery'
    tribe.researchByName(TechnologyName.Pottery)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })

    const throwingFunction = (): void => {
        const playerAction = new ResearchPlayerAction(player.tribe, TechnologyRepository.createFromName(TechnologyName.Pottery))
        const turnResult = turnDecisionManager.processTurn(playerAction, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({ Pottery: true })
    }

    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because it is already known`)
})

test('cannot research undefined technology', () => {
    // TODO test this in another place, where the actual validation happens
    // const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    //
    // const tribe = TribeFactory.createStarterTribeWithOptions()
    // expect(tribe.technologies).toStrictEqual({})
    //
    // const player = new Player(tribe)
    // const turn = new Turn(player)
    //
    // const techName = 'Hello World'
    //
    // const throwingFunction = (): void => {
    //     const playerAction = new ResearchPlayerAction(player.tribe, TechnologyRepository.createFromName(TechnologyName.Pottery))
    //     const turnResult = turnDecisionManager.processTurn(playerAction, turn)
    //
    //     expect(tribe.technologies).toStrictEqual({})
    // }
    // expect(throwingFunction).toThrow(`Invalid technology name '${techName}'.`)
})
