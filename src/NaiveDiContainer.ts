import ActionPerformer from './app/ActionPerformer.ts'
import CurrentGame from './app/CurrentGame.ts'
import EndGameManager from './app/EndGameManager.ts'
import RelationsManager from './app/RelationsManager.ts'
import StartGameManager from './app/StartGameManager.ts'
import TurnDecisionManager from './app/TurnDecisionManager.ts'
import TurnManager from './app/TurnManager.ts'
import Arm from './domain/action-performer/Arm.ts'
import AttackTile from './domain/action-performer/AttackTile.ts'
import AttackTribe from './domain/action-performer/AttackTribe.ts'
import Conquer from './domain/action-performer/Conquer.ts'
import Cult from './domain/action-performer/Cult.ts'
import Expedition from './domain/action-performer/Expedition.ts'
import GoTo1stRadius from './domain/action-performer/GoTo1stRadius.ts'
import GoTo2ndRadius from './domain/action-performer/GoTo2ndRadius.ts'
import GoTo3rdRadius from './domain/action-performer/GoTo3rdRadius.ts'
import Research from './domain/action-performer/Research.ts'
import Rome from './domain/entity/Rome.ts'
import DiceThrower from './domain/helper/DiceThrower.ts'
import FightManager from './domain/helper/FightManager.ts'
import NotInContainer from './exception/internal/NotInContainer.ts'
import BrowserGameProcess from './outer/BrowserGameProcess.ts'
import ConsoleGameProcess from './outer/ConsoleGameProcess.ts'
import ExceptionHandler from './outer/exception-handler/ExceptionHandler.ts'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'
import CommonPlayerController from './ui/common/CommonPlayerController.ts'
import CommonRoundManager from './ui/common/CommonRoundManager.ts'
import ConsoleCommandPerformer from './ui/console/ConsoleCommandPerformer.ts'
import ConsolePlayerController from './ui/console/ConsolePlayerController.ts'
import ConsoleUi from './ui/console/ConsoleUi.ts'
import MainMenu from './ui/console/MainMenu.ts'
import PlayerActionGetter from './ui/console/PlayerActionGetter.ts'
import PlayerRelationActionGetter from './ui/console/PlayerRelationActionGetter.ts'
import Printer from './ui/console/Printer.ts'
import RelationRoundManager from './ui/console/RelationRoundManager.ts'
import RoundManager from './ui/console/RoundManager.ts'
import Std from './ui/console/Std.ts'
import TribePrinter from './ui/console/TribePrinter.ts'
import ActionInfo from './ui/web/logic/ActionInfo.ts'
import GamePage from './ui/web/logic/GamePage.ts'
import RegularRound from './ui/web/logic/RegularRound.ts'
import WebUi from './ui/web/WebUi.ts'

class NaiveDiContainer {
    public singletonToInstanceMap = {}

    constructor() {
        this.buildMap()
    }

    public resolveSafely<T>(className: Function): T {
        if (className.name in this.singletonToInstanceMap) {
            return this.singletonToInstanceMap[className.name]
        }
        throw new NotInContainer(className.name)
    }

    public clearInstances(): void {
        this.singletonToInstanceMap = {}
    }

    public setMock(className: Function, instance: object): void {
        this.singletonToInstanceMap[className.name] = instance
        this.singletonToInstanceMap[instance.constructor.name] = instance
    }

    public rebuildMap(): void {
        this.buildMap()
    }

    /**
     * Dependency tree:
     * src/*:
     *     src/outer:
     *         src/ui:
     *             src/app:
     *                 src/exception:
     *                 src/domain:
     *                     src/domain/repository:
     *                         src/domain/enum:
     */
    private buildMap(): void {
        // enums cannot be instantiated
        // this.buildEnums()
        // repositories are static classes
        // this.buildRepositories()
        this.buildDomain()
        this.buildApp()
        this.buildUi()
        this.buildOuter()
        this.buildRoot()
    }

    private buildDomain(): void {
        // // // entity
        this.setSingleton(Rome, new Rome())
        // // // helper
        this.setSingleton(DiceThrower, new DiceThrower())
        // // // action
        this.setSingleton(Research, new Research())
        this.setSingleton(Arm, new Arm())
        this.setSingleton(GoTo3rdRadius, new GoTo3rdRadius())
        this.setSingleton(GoTo2ndRadius, new GoTo2ndRadius())
        this.setSingleton(GoTo1stRadius, new GoTo1stRadius())
        this.setSingleton(FightManager, new FightManager(this.resolveSafely(Rome)))
        this.setSingleton(Conquer, new Conquer(this.resolveSafely(FightManager)))
        this.setSingleton(Cult, new Cult(this.resolveSafely(DiceThrower)))
        this.setSingleton(Expedition, new Expedition(this.resolveSafely(DiceThrower)))
        this.setSingleton(AttackTile, new AttackTile(this.resolveSafely(FightManager)))
        this.setSingleton(AttackTribe, new AttackTribe(this.resolveSafely(FightManager)))
    }

    private buildApp(): void {
        this.setSingleton(CurrentGame, new CurrentGame())
        this.setSingleton(StartGameManager, new StartGameManager())
        this.setSingleton(EndGameManager, new EndGameManager(
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(TurnManager, new TurnManager())
        this.setSingleton(RelationsManager, new RelationsManager())

        this.setSingleton(ActionPerformer, new ActionPerformer(
            this.resolveSafely(Arm),
            this.resolveSafely(Research),
            this.resolveSafely(Expedition),
            this.resolveSafely(GoTo3rdRadius),
            this.resolveSafely(GoTo2ndRadius),
            this.resolveSafely(GoTo1stRadius),
            this.resolveSafely(Conquer),
            this.resolveSafely(Cult),
            this.resolveSafely(AttackTile),
            this.resolveSafely(AttackTribe),
        ))
        this.setSingleton(TurnDecisionManager, new TurnDecisionManager(this.resolveSafely(ActionPerformer)))
    }

    private buildUi(): void {
        this.buildCommonUi()
        this.buildConsole()
        this.buildWeb()
    }

    private buildCommonUi(): void {
        this.setSingleton(CommonRoundManager, new CommonRoundManager(this.resolveSafely(RelationsManager)))
        this.setSingleton(CommonPlayerController, new CommonPlayerController())
    }

    private buildConsole(): void {
        this.setSingleton(Std, new Std())
        this.setSingleton(TribePrinter, new TribePrinter())
        this.setSingleton(Printer, new Printer())

        this.setSingleton(MainMenu, new MainMenu(this.resolveSafely(Std)))
        this.setSingleton(PlayerActionGetter, new PlayerActionGetter(
            this.resolveSafely(Std),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(PlayerRelationActionGetter, new PlayerRelationActionGetter(this.resolveSafely(Std)))
        this.setSingleton(ConsolePlayerController, new ConsolePlayerController(
            this.resolveSafely(TurnManager),
            this.resolveSafely(Std),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(RelationRoundManager, new RelationRoundManager(
            this.resolveSafely(RelationsManager),
            this.resolveSafely(PlayerRelationActionGetter),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(ConsoleCommandPerformer, new ConsoleCommandPerformer(
            this.resolveSafely(Std),
            this.resolveSafely(TribePrinter),
            this.resolveSafely(Printer),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(RoundManager, new RoundManager(
            this.resolveSafely(DiceThrower),
            this.resolveSafely(Std),
            this.resolveSafely(TurnManager),
            this.resolveSafely(TurnDecisionManager),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(PlayerActionGetter),
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(RelationsManager),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(CommonRoundManager),
        ))
        this.setSingleton(ConsoleUi, new ConsoleUi(
            this.resolveSafely(RoundManager),
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(ConsolePlayerController),
            this.resolveSafely(CurrentGame),
        ))
    }

    private buildWeb(): void {
        this.setSingleton(GamePage, new GamePage(
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(TurnManager),
            this.resolveSafely(RelationsManager),
        ))
        this.setSingleton(ActionInfo, new ActionInfo(
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(TurnManager),
            this.resolveSafely(RelationsManager),
            this.resolveSafely(CommonRoundManager),
        ))
        this.setSingleton(RegularRound, new RegularRound(
            this.resolveSafely(CurrentGame),
            this.resolveSafely(TurnManager),
            this.resolveSafely(RelationsManager),
            this.resolveSafely(CommonRoundManager),
        ))
        this.setSingleton(WebUi, new WebUi(
            this.resolveSafely(RoundManager),
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
        ))
    }

    private buildOuter(): void {
        this.setSingleton(ExceptionHandler, new ExceptionHandler())
        this.setSingleton(TribalRelationsGame, new TribalRelationsGame())
        this.setSingleton(ConsoleGameProcess, new ConsoleGameProcess(
            this.resolveSafely(StartGameManager),
            this.resolveSafely(ConsoleUi),
            this.resolveSafely(EndGameManager),
            this.resolveSafely(MainMenu),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(BrowserGameProcess, new BrowserGameProcess(
            this.resolveSafely(StartGameManager),
            this.resolveSafely(WebUi),
            this.resolveSafely(EndGameManager),
            this.resolveSafely(CurrentGame),
        ))
    }

    private buildRoot(): void {

    }

    private setSingleton(className: Function, instance: object, override: boolean = false): void {
        if (className.name in this.singletonToInstanceMap && !override) {
            return
        }
        this.singletonToInstanceMap[className.name] = instance
    }
}

const container = new NaiveDiContainer()

export { container }
