import type ConsoleCommandPerformer from './console/ConsoleCommandPerformer.ts'
import ConsoleCommand from './console/entity/ConsoleCommand.ts'
import PlayerActionCliParameter from './console/entity/PlayerActionCliParameter'
import CommandName from './console/enum/CommandName.ts'
import ConsoleCommandRepository from './console/repository/ConsoleCommandRepository.ts'
import type Std from './Std.ts'
import type RoundManager from '../app/RoundManager.ts'
import type TurnDecisionManager from '../app/TurnDecisionManager.ts'
import type TurnManager from '../app/TurnManager.ts'
import type TurnResult from '../app/TurnResult.ts'
import AbstractPlayerAction from '../domain/entity/action/AbstractPlayerAction'
import AttackTilePlayerAction from '../domain/entity/action/AttackTilePlayerAction'
import type PlayerActionInterface from '../domain/entity/action/PlayerActionInterface'
import ResearchPlayerAction from '../domain/entity/action/ResearchPlayerAction'
import Game from '../domain/entity/Game.ts'
import type GameAction from '../domain/entity/GameAction.ts'
import Player from '../domain/entity/Player.ts'
import type Tile from '../domain/entity/Tile'
import Tribe from '../domain/entity/Tribe.ts'
import type Turn from '../domain/entity/Turn.ts'
import ActionName from '../domain/enum/ActionName.ts'
import ResourceName from '../domain/enum/ResourceName'
import TechnologyName from '../domain/enum/TechnologyName'
import TribeName from '../domain/enum/TribeName.ts'
import ActionRepository from '../domain/repository/ActionRepository.ts'
import TechnologyRepository from '../domain/repository/TechnologyRepository'
import ActionUnsuccessful from '../exception/ActionUnsuccessful.ts'
import InvalidInput from '../exception/console/InvalidInput.ts'

class ConsoleUi {
    static decisionToActionDataMap: Record<string, { name: ActionName, parameters: PlayerActionCliParameter[] }> = {
        a: { name: ActionName.Arm, parameters: [] },
        al: { name: ActionName.Alliance, parameters: [new PlayerActionCliParameter(TribeName)] },
        atile: {
            name: ActionName.AttackTile,
            parameters: [new PlayerActionCliParameter(TribeName), new PlayerActionCliParameter(ResourceName)],
        },
        atr: { name: ActionName.AttackTribe, parameters: [new PlayerActionCliParameter(TribeName)] },

        c: { name: ActionName.Caravan, parameters: [new PlayerActionCliParameter(TribeName)] },
        e: { name: ActionName.Expedition, parameters: [] },

        g3: { name: ActionName.GoTo3rdRadius, parameters: [] },
        g2: { name: ActionName.GoTo2ndRadius, parameters: [] },
        g1: { name: ActionName.GoTo1stRadius, parameters: [] },

        h: {
            name: ActionName.Hire,
            parameters: [new PlayerActionCliParameter(TribeName), new PlayerActionCliParameter(Number), new PlayerActionCliParameter(Number)],
        },
        h1: {
            name: ActionName.HireOneRound,
            parameters: [new PlayerActionCliParameter(TribeName), new PlayerActionCliParameter(Number), new PlayerActionCliParameter(Number)],
        },

        pray: { name: ActionName.Pray, parameters: [] },
        pil: { name: ActionName.Pillage, parameters: [new PlayerActionCliParameter(TribeName)] },

        q: { name: ActionName.Quit, parameters: [] },
        r: { name: ActionName.Research, parameters: [new PlayerActionCliParameter(TechnologyName)] },

        rmca: { name: ActionName.RemoveCaravan, parameters: [new PlayerActionCliParameter(TribeName)] },

        co: { name: ActionName.Conquer, parameters: [] },
        cu: { name: ActionName.Cult, parameters: [] },
    }

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

    _game: Game | undefined

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _roundManager: RoundManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    get std(): Std {
        return this._std
    }

    public startTurns(): TurnResult {
        // something is wrong here....
        // but game cannot be singleton because players?
        // no, we can add players later
        // yes, must make game singleton
        // TODO make game singleton
        this._consoleCommandPerformer.game = this.game
        this._roundManager.game = this.game

        this.updatePlayers()

        this.outputStartInfo()
        this._consoleCommandPerformer.outputAvailableCommands()
        this._consoleCommandPerformer.outputAvailableActions()

        return this.startRounds()
    }

    private startRounds(): TurnResult {
        let turnResult: TurnResult
        let globalTurnNumber = 1
        for (let round = 1; true; ++round) {
            this._std.out(`\t\t\tRound ${round}`)

            for (let i = 0; i < this.game.players.length; ++i, ++globalTurnNumber) {
                this._std.out(`\t\t\tTurn ${globalTurnNumber}`)
                const nextTurn = this._turnManager.nextTurn(this.game)
                turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)

                if (turnResult.isLast) {
                    this._std.out('last turn')
                    return turnResult
                }
                this._std.outEmptyLine()
            }
            this._std.out('\t\t\tRound finished. Population growth phase.')

            this._roundManager.finalizeRound()
            this.game.nextRound()
        }
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        let turnResult: TurnResult
        let decision: GameAction | ConsoleCommand
        let parameters: string
        for (; ;) {
            try {
                const decisionWithParameters = this.getDecisionSafe(player)
                decision = decisionWithParameters.decision
                parameters = decisionWithParameters.parameters

                if (decision instanceof ConsoleCommand) {
                    this._consoleCommandPerformer.performCommand(decision, parameters, nextTurn)
                    continue
                }

                nextTurn.parameters = parameters
                turnResult = this._turnDecisionManager.processTurn(decision, nextTurn)
                if (!turnResult.success) {
                    throw new ActionUnsuccessful(decision.name, turnResult.errorMessage)
                }
                break
            } catch (error) {
                if (error instanceof Error) {
                    this._std.out(error.message)
                } else {
                    this._std.out(error)
                }
            }
        }
        return turnResult
    }

    getDecisionSafe(player: Player): { decision: PlayerActionInterface | ConsoleCommand, parameters: string } {
        let rawDecision: string
        let decision: PlayerActionInterface | ConsoleCommand
        let parameters: string

        for (; ;) {
            try {
                rawDecision = this._std.in(`${player.name} Decision >`) ?? 'q'
                decision = this.getDecision(rawDecision, player)
                parameters = this.getParameter(rawDecision)

                break
            } catch (error) {
                if (error instanceof Error) {
                    this._std.out(error.message)
                } else {
                    this._std.out(error)
                }
            }
        }
        return { decision, parameters }
    }

    getDecision(rawDecision: string, player: Player): PlayerActionInterface | ConsoleCommand {
        const words = rawDecision.split(' ')
        const actionOrCommand = words[0].toLowerCase()

        if (actionOrCommand in ConsoleUi.decisionToActionDataMap) {
            return this.getPlayerActionFromRawDecision(player, actionOrCommand, words)
        }

        if (actionOrCommand in ConsoleUi.decisionToCommandDataMap) {
            return ConsoleCommandRepository.createFromName(ConsoleUi.decisionToCommandDataMap[actionOrCommand].name)
        }

        throw new InvalidInput()
    }

    private getPlayerActionFromRawDecision(player: Player, actionOrCommand: string, words: string[]): PlayerActionInterface {
        const mapEntry = ConsoleUi.decisionToActionDataMap[actionOrCommand]
        const gameAction = ActionRepository.createFromName(mapEntry.name)

        if (words.length !== mapEntry.parameters.length) {
            throw new Error('insufficient parameters')
        }
        if (words.length === 0 && mapEntry.parameters.length === 0) {
            return new AbstractPlayerAction(gameAction, player)
        }

        if (mapEntry.name === ActionName.Alliance) {
            mapEntry.parameters[0].check(words[0])
            // TODO implement after these actions are added
            return new AbstractPlayerAction(gameAction, player)
        }

        if (mapEntry.name === ActionName.Research) {
            mapEntry.parameters[0].check(words[0])
            return new ResearchPlayerAction(player, TechnologyRepository.createFromName(words[0]))
        }

        if (mapEntry.name === ActionName.AttackTile) {
            mapEntry.parameters[0].check(words[0])
            mapEntry.parameters[1].check(words[1])
            const defender = this.getTribeByTribeName((words[0] as TribeName))
            const tile = this.getTribeTileByResourceName(defender, (words[1] as ResourceName))

            return new AttackTilePlayerAction(player.tribe, defender, tile)
        }

        return new AbstractPlayerAction(gameAction, player)
    }

    private getTribeByTribeName(tribeName: TribeName): Tribe {
        return this.game.getTribe(tribeName)
    }

    private getTribeTileByResourceName(tribe: Tribe, resourceName: ResourceName): Tile {
        return tribe.getFirstTileWithResource(resourceName)
    }

    private getParameter(rawDecision: string): string {
        const words = rawDecision.split(' ')
        if (words.length > 1) {
            const paramStrings = (words.slice(1)).join(' ')
            return paramStrings
        }
        return ''
    }

    private outputStartInfo(): void {
        let line: string

        for (let i = 0; i < this.game.players.length; i++) {
            line = `\t${this.game.players[i].name}\t-\tTribe '${this.game.players[i].tribe.name}'`

            this._std.out(line)
        }
    }

    private updatePlayers(): void {
        this._std.out('Adding players')

        const playerNames: string[] = []
        let playerName: string
        for (; true;) {
            for (let i = 1; i <= Game.maxPlayers; i++) {
                this._std.out(`Adding player ${i}/${Game.maxPlayers}`)

                playerName = this._std.in(`Enter player ${i} name (or return to end adding players)>`) ?? `player ${i}`
                if (!playerName || playerName === '\n') {
                    break
                }
                playerNames.push(playerName)
            }
            if (playerNames.length !== 0) {
                break
            }
        }
        this.game.players = this.createPlayers(playerNames)
        this._turnManager.addPlayers(this.game.players.length)
    }

    private createPlayers(playerNames: string[]): Player[] {
        const players = []
        const tribeNames = (Object as any).values(TribeName).slice(0, playerNames.length)

        for (let i = 0; i < playerNames.length; i++) {
            players[i] = new Player(
                new Tribe(tribeNames[i]),
                playerNames[i],
            )
        }
        return players
    }
}

export default ConsoleUi
