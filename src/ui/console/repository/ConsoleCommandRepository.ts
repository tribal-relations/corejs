import ConsoleCommand from '../entity/ConsoleCommand.ts'
import CommandName from '../enum/CommandName.ts'

class ConsoleCommandRepository {
    static decisionTextToCommandDataMap: Record<string, { name: CommandName, parameters: string }> = {
        p: { name: CommandName.PrintCurrentPlayerTribe, parameters: '' },
        pt: { name: CommandName.PrintAllTribes, parameters: '' },
        ptt: { name: CommandName.PrintTechnologyTree, parameters: '' },
        paa: { name: CommandName.PrintAvailableActions, parameters: '' },
        pac: { name: CommandName.PrintAvailableCommands, parameters: '' },
        '?': { name: CommandName.PrintAvailableCommands, parameters: '' },
        help: { name: CommandName.PrintAvailableCommands, parameters: '' },

        // @deprecated
        // pti: { name: CommandName.PrintTechnologyInfo, parameters: '<tech name>' },
    }

    static createFromName(name: CommandName): ConsoleCommand {
        return new ConsoleCommand(name)
    }
}

export default ConsoleCommandRepository
