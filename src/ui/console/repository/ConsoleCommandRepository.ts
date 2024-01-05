import ConsoleCommand from '../entity/ConsoleCommand.ts'
import CommandName from '../enum/CommandName.ts'

const consoleCommands: Record<string, { name: string, description: string, parameters: string }> = {
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


class ConsoleCommandRepository {
    static createFromName(name: CommandName, parameters: string = ''): ConsoleCommand {
        return new ConsoleCommand(String(name), consoleCommands[name].description, parameters)
    }
}

export default ConsoleCommandRepository
