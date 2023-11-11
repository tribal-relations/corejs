import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import Player from '../../../src/domain/entity/Player'
import Turn from '../../../src/domain/entity/Turn'
import ActionName from '../../../src/domain/enum/ActionName'
import TechnologyName from '../../../src/domain/enum/TechnologyName'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TribeFactory from '../../../src/outer/factory/TribeFactory'

test('research adds technology', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const action = ActionRepository.createFromName(ActionName.Research)
    turn.parameters = 'Pottery'
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })
})

test('cannot research blocked technology', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const techName = 'Advanced Writing'

    const throwingFunction = (): void => {
        const action = ActionRepository.createFromName(ActionName.Research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({})
    }
    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
})

test('cannot research already known technology', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const techName = 'Pottery'
    tribe.research(TechnologyName.Pottery)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })

    const throwingFunction = (): void => {
        const action = ActionRepository.createFromName(ActionName.Research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({ Pottery: true })
    }

    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because it is already known`)
})

test('cannot research undefined technology', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const techName = 'Hello World'

    const throwingFunction = (): void => {
        const action = ActionRepository.createFromName(ActionName.Research)
        turn.parameters = techName
        turnDecisionManager.processTurn(action, turn)

        expect(tribe.technologies).toStrictEqual({})
    }
    expect(throwingFunction).toThrow(`Invalid technology name '${techName}'.`)
})
