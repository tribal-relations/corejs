import { singleton } from 'tsyringe'
import ConsoleCommand from '../entity/ConsoleCommand'
import CommandName from '../enum/CommandName'

const consoleCommands: Record<string, { name: string, description: string, parameters: string }> = {
    'Print current player tribe': { name: CommandName.PrintCurrentPlayerTribe, description: '', parameters: '' },
    'Print tribe': { name: CommandName.PrintTribe, description: '', parameters: '<tribe name>' },
    'Print all tribes': { name: CommandName.PrintAllTribes, description: '', parameters: '' },
    'Print available actions': { name: CommandName.PrintAvailableActions, description: '', parameters: '' },
    'Print available commands': { name: CommandName.PrintAvailableCommands, description: '', parameters: '' },
}

@singleton()
class ConsoleCommandRepository {
    static createFromName(name: CommandName): ConsoleCommand {
        return new ConsoleCommand(String(name), consoleCommands[name].description, consoleCommands[name].parameters)
    }
}

export default ConsoleCommandRepository
