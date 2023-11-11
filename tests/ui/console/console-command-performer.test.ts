import 'reflect-metadata'
import { container } from 'tsyringe'
import Player from '../../../src/domain/entity/Player'
import Turn from '../../../src/domain/entity/Turn'
import TechnologyName from '../../../src/domain/enum/TechnologyName'
import TribeFactory from '../../../src/outer/factory/TribeFactory'
import ConsoleCommandPerformer from '../../../src/ui/console/ConsoleCommandPerformer'
import CommandName from '../../../src/ui/console/enum/CommandName'
import Printer from '../../../src/ui/console/Printer'
import ConsoleCommandRepository from '../../../src/ui/console/repository/ConsoleCommandRepository'
import TribePrinter from '../../../src/ui/console/TribePrinter'
import MockStd from '../../mock/MockStd'

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
