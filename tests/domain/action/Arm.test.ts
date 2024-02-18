import CurrentGame from '../../../src/app/CurrentGame.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import type GameplayAction from '../../../src/domain/entity/action/GameplayAction.ts'
import type PlayerActionInterface from '../../../src/domain/entity/action/PlayerActionInterface.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import CommonRoundManager from '../../../src/ui/common/CommonRoundManager.ts'

test('arm for amount of production', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const commonRoundManager = container.resolveSafely(CommonRoundManager)
    const game = container.resolveSafely(CurrentGame)

    const tribe = TribeFactory.createStarterTribe()
    expect(tribe.population).toBe(2)
    expect(tribe.production).toBe(2)
    expect(tribe.militaryPower).toBe(1)

    const player = new Player(tribe)
    game.playersLength = 1
    game.players = { pl: player }
    const turn = new Turn(player)
    const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Arm)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    commonRoundManager.populationGrowth()
    commonRoundManager.populationGrowth()
    commonRoundManager.populationGrowth()

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBeGreaterThan(5)
    expect(tribe.militaryPower).toBe(3)
})

test.skip('arm for amount of production, but not bigger than non-armed population', () => {
    // 'need to be done after repositories are singletons so i can make rand singleton and mock it'

    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const game = container.resolveSafely(CurrentGame)

    const tribe = TribeFactory.createStarterTribe()

    expect(tribe.population).toBe(2)
    expect(tribe.militaryPower).toBe(1)

    const player = new Player(tribe)
    game.playersLength = 1
    game.players = { pl: player }
    const turn = new Turn(player)
    const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Arm)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    const expedition = new AbstractPlayerAction(
        container.resolveSafely(GameplayActionRepository).get(ActionName.Expedition),
        player.tribe,
    )
    turnDecisionManager.processTurn(expedition, turn)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)
})

test('cannot arm more than population', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions({ production: 90, population: 100, militaryPower: 0 })

    const player = new Player(tribe)
    const turn = new Turn(player)
    let gameAction: GameplayAction
    let playerAction: PlayerActionInterface
    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)
    expect(tribe.production).toBeGreaterThan(90)

    gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Arm)
    playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBeGreaterThan(90)

    gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Arm)
    playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)

    const throwingFunction = (): void => {
        const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Arm)
        const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

        turnDecisionManager.processTurn(playerAction, turn)
    }
    expect(tribe.militaryPower).toBe(100)

    expect(throwingFunction).toThrow('Cannot arm further. Attained maximal military power 100 for population 100.')
})
