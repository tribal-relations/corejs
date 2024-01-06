import CommandName from './enum/CommandName.ts'

class ConsoleCommandRepository {
    static decisionToCommandDataMap: Record<string, { name: CommandName, parameters: string }> = {
        p: { name: CommandName.PrintCurrentPlayerTribe, parameters: '' },
        pt: { name: CommandName.PrintAllTribes, parameters: '' },
        ptt: { name: CommandName.PrintTechnologyTree, parameters: '' },
        pti: { name: CommandName.PrintTechnologyInfo, parameters: '<tech name>' },
        paa: { name: CommandName.PrintAvailableActions, parameters: '' },
        pac: { name: CommandName.PrintAvailableCommands, parameters: '' },
        '?': { name: CommandName.PrintAvailableCommands, parameters: '' },
        help: { name: CommandName.PrintAvailableCommands, parameters: '' },
    }
}

export default ConsoleCommandRepository
