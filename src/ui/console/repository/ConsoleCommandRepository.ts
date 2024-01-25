import ConsoleCommand from '../entity/ConsoleCommand.ts'
import CommandName from '../enum/CommandName.ts'

class ConsoleCommandRepository {
    static decisionTextToCommandDataMap: Record<string, { name: CommandName /* parameters: string */ }> = {
        p: { name: CommandName.PrintCurrentPlayerTribe },
        pt: { name: CommandName.PrintAllTribes },
        ptt: { name: CommandName.PrintTechnologyTree },
        pr: { name: CommandName.PrintRelations },
        prb: { name: CommandName.PrintRelationsBonuses },

        pc: { name: CommandName.PrintCaravans },

        paa: { name: CommandName.PrintAvailableActions },
        pac: { name: CommandName.PrintAvailableCommands },
        '?': { name: CommandName.PrintAvailableCommands },
        help: { name: CommandName.PrintAvailableCommands },

        // @deprecated
        // pti: { name: CommandName.PrintTechnologyInfo, parameters: '<tech name>' },
    }

    static createFromName(name: CommandName): ConsoleCommand {
        return new ConsoleCommand(name)
    }
}

export default ConsoleCommandRepository
