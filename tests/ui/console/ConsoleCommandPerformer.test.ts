import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import ConsoleCommandPerformer from '../../../src/ui/console/ConsoleCommandPerformer.ts'
import CommandName from '../../../src/ui/console/enum/CommandName.ts'
import Std from '../../../src/ui/console/io/Std.ts'
import ConsoleCommandRepository from '../../../src/ui/console/repository/ConsoleCommandRepository.ts'

test.skip('can output actions', () => {
    const mockStd = container.resolveSafely(Std)
    const consoleCommandPerformer = container.resolveSafely(ConsoleCommandPerformer)

    const command = ConsoleCommandRepository.createFromName(CommandName.PrintAvailableActions)

    const tribe = TribeFactory.createStarterTribe()
    const player = new Player(tribe)
    const turn = new Turn(player)

    consoleCommandPerformer.performCommand(command, '', turn)

    const hardcoded = 'Available actions:\n' +
        '\ta\t-\tArm the population \n' +
        '\tal\t-\tMake an alliance <Tribe Name>\n' +
        '\tatile\t-\tAttack a tile <Tribe Name> <Tile Resource Name>\n' +
        '\tatr\t-\tAttack a tribe <Tribe Name>\n' +
        '\tc\t-\tSend a caravan <Tribe Name>\n' +
        '\te\t-\tMake an expedition \n' +
        '\tg3\t-\tSettle near the borders \n' +
        '\tg2\t-\tSettle inside the state \n' +
        '\tg1\t-\tSettle inside the city \n' +
        '\th\t-\tHire warriors <Tribe Name> <Number of troops to hire> <Amount of gold to pay>\n' +
        '\th1\t-\tHire warriors for 1 round <Tribe Name> <Number of troops to hire> <Amount of gold to pay>\n' +
        '\tpray\t-\tPray the guardian God \n' +
        '\tpil\t-\tPillage a caravan <Sender tribe Name> <Recipient tribe Name>\n' +
        '\tq\t-\tQuit \n' +
        '\tr\t-\tResearch <Technology Name>\n' +
        '\trmca\t-\tRemove a caravan <Tribe Name>\n' +
        '\tco\t-\tConquer the palace \n' +
        '\tcu\t-\tExpand the cult '

    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})

test('can output tech tree', () => {
    const mockStd = container.resolveSafely(Std)

    const consoleCommandPerformer = container.resolveSafely(ConsoleCommandPerformer)
    const command = ConsoleCommandRepository.createFromName(CommandName.PrintTechnologyTree)

    const tribe = TribeFactory.createStarterTribe()
    const player = new Player(tribe)
    const turn = new Turn(player)

    consoleCommandPerformer.performCommand(command, '', turn)
    const hardcoded = 'Technology tree:\n' +
        'Animal Husbandry\n' +
        'Archery\n' +
        'Fishing\n' +
        'Hunting\n' +
        'Musical Instruments\n' +
        'Poetry\n' +
        'Stone Working   -->  \n' +
        '                        Idols\n' +
        '                        Bronze Weapons   -->  \n' +
        '                                                Organized Army\n' +
        'Pottery   -->  \n' +
        '                        Primitive Writing   -->  \n' +
        '                                                Advanced Writing\n' +
        '                                                Calendar   -->  \n' +
        '                                                                        Plough'

    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})

test('can get tech info', () => {
    const mockStd = container.resolveSafely(Std)
    const consoleCommandPerformer = container.resolveSafely(ConsoleCommandPerformer)
    const command = ConsoleCommandRepository.createFromName(CommandName.PrintTechnologyInfo)

    const tribe = TribeFactory.createStarterTribe()
    const player = new Player(tribe)
    const turn = new Turn(player)

    consoleCommandPerformer.performCommand(command, TechnologyName.Pottery, turn)

    const hardcoded = '_name: Pottery\n' +
        '_description: Harvest result +2\n' +
        '_prerequisites: no'
    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})
