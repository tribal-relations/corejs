import fs from 'fs'
import CurrentGame from '../../../src/app/CurrentGame.ts'
import GameSaver from '../../../src/app/features/save/GameSaver.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import ResearchPlayerAction from '../../../src/domain/entity/action/ResearchPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import TechnologyRepository from '../../../src/domain/repository/TechnologyRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('can save game', () => {
    const gameSaver: GameSaver = container.resolveSafely(GameSaver)
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const techRepo = container.resolveSafely(TechnologyRepository)
    const game = container.resolveSafely(CurrentGame)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    turnDecisionManager.processTurn(
        new ResearchPlayerAction(player.tribe, techRepo.get(TechnologyName.Pottery)),
        turn,
    )

    turnDecisionManager.processTurn(
        new ResearchPlayerAction(player.tribe, techRepo.get(TechnologyName.Hunting)),
        turn,
    )

    gameSaver.saveGame('tests/app/features/test_save.json')
    const buf = fs.readFileSync('tests/app/features/test_save.json')
    const rawJsonSave = buf.toString()

    console.log(rawJsonSave)
    const gameFromSave = JSON.parse(rawJsonSave)

    expect(gameFromSave._currentGameDto._playersLength).toBe(1)
    expect(Object.keys(gameFromSave._currentGameDto._specificGame._players)).toBe(['player 0'])
})
