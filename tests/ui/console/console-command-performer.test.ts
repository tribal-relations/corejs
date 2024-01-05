import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import ConsoleCommandPerformer from '../../../src/ui/console/ConsoleCommandPerformer.ts'
import CommandName from '../../../src/ui/console/enum/CommandName.ts'
import Printer from '../../../src/ui/console/Printer.ts'
import ConsoleCommandRepository from '../../../src/ui/console/repository/ConsoleCommandRepository.ts'
import TribePrinter from '../../../src/ui/console/TribePrinter.ts'
import MockStd from '../../mock/MockStd.ts'

test('can output tech tree', () => {
    const mockStd = container.resolve(MockStd)
    const tribePrinter = container.resolve(TribePrinter)
    const printer = container.resolve(Printer)

    const consoleCommandPerformer = new ConsoleCommandPerformer(mockStd, tribePrinter, printer)
    const command = ConsoleCommandRepository.createFromName(CommandName.PrintTechnologyTree)

    const tribe = TribeFactory.createEmpty()
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
    const mockStd = container.resolve(MockStd)
    const tribePrinter = container.resolve(TribePrinter)
    const printer = container.resolve(Printer)

    const consoleCommandPerformer = new ConsoleCommandPerformer(mockStd, tribePrinter, printer)
    const command = ConsoleCommandRepository.createFromName(CommandName.PrintTechnologyInfo)

    const tribe = TribeFactory.createEmpty()
    const player = new Player(tribe)
    const turn = new Turn(player)

    consoleCommandPerformer.performCommand(command, TechnologyName.Pottery, turn)

    const hardcoded = '_name: Pottery\n' +
        '_description: Harvest result +2\n' +
        '_prerequisites: no'
    expect(mockStd.getFullOutputAsString().includes(hardcoded)).toBe(true)
})
