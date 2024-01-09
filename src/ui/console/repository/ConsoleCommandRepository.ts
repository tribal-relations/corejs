import ConsoleCommand from '../entity/ConsoleCommand.ts'
import CommandName from '../enum/CommandName.ts'

class ConsoleCommandRepository {
    static decisionToCommandDataMap: Record<string, { name: CommandName, description: string, parameters: string }> = {
        [CommandName.PrintCurrentPlayerTribe]: { name: CommandName.PrintCurrentPlayerTribe, description: '', parameters: '' },
        [CommandName.PrintTribe]: { name: CommandName.PrintTribe, description: '', parameters: '<tribe name>' },
        [CommandName.PrintAllTribes]: { name: CommandName.PrintAllTribes, description: '', parameters: '' },

        [CommandName.PrintTechnologyTree]: { name: CommandName.PrintTechnologyTree, description: '', parameters: '' },
        [CommandName.PrintTechnologyInfo]: {
            name: CommandName.PrintTechnologyInfo,
            description: '',
            parameters: '<tech name>',
        },

        [CommandName.PrintAvailableActions]: { name: CommandName.PrintAvailableActions, description: '', parameters: '' },
        [CommandName.PrintAvailableCommands]: { name: CommandName.PrintAvailableCommands, description: '', parameters: '' },
    }

    static createFromName(name: CommandName, parameters: string = ''): ConsoleCommand {
        return new ConsoleCommand(String(name), ConsoleCommandRepository.decisionToCommandDataMap[name].description, parameters)
    }
}

export default ConsoleCommandRepository
