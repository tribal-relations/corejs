import ActionPerformer from './app/ActionPerformer.ts'
import CurrentGame from './app/CurrentGame.ts'
import EndGameManager from './app/EndGameManager.ts'
import StartGameManager from './app/StartGameManager.ts'
import TurnDecisionManager from './app/TurnDecisionManager.ts'
import TurnManager from './app/TurnManager.ts'
import Alliance from './domain/action-performer/Alliance.ts'
import Arm from './domain/action-performer/Arm.ts'
import AttackTile from './domain/action-performer/AttackTile.ts'
import AttackTribe from './domain/action-performer/AttackTribe.ts'
import Caravan from './domain/action-performer/Caravan.ts'
import Conquer from './domain/action-performer/Conquer.ts'
import Cult from './domain/action-performer/Cult.ts'
import Expedition from './domain/action-performer/Expedition.ts'
import GoTo1stRadius from './domain/action-performer/GoTo1stRadius.ts'
import GoTo2ndRadius from './domain/action-performer/GoTo2ndRadius.ts'
import GoTo3rdRadius from './domain/action-performer/GoTo3rdRadius.ts'
import Hire from './domain/action-performer/Hire.ts'
import HireOneRound from './domain/action-performer/HireOneRound.ts'
import PillageCaravan from './domain/action-performer/PillageCaravan.ts'
import Pray from './domain/action-performer/Pray.ts'
import Quit from './domain/action-performer/Quit.ts'
import RemoveCaravan from './domain/action-performer/RemoveCaravan.ts'
import Research from './domain/action-performer/Research.ts'
import Rome from './domain/entity/Rome.ts'
import DiceThrower from './domain/helper/DiceThrower.ts'
import FightManager from './domain/helper/FightManager.ts'
import CaravansStore from './domain/store/CaravansStore.ts'
import RelationsStore from './domain/store/RelationsStore.ts'
import NotInContainer from './exception/internal/NotInContainer.ts'
import ConsoleGameProcess from './outer/ConsoleGameProcess.ts'
import ExceptionHandler from './outer/exception-handler/ExceptionHandler.ts'
import TribalRelationsGame from './outer/TribalRelationsGame.ts'
import CommonPlayerController from './ui/common/CommonPlayerController.ts'
import CommonRelationRoundManager from './ui/common/CommonRelationRoundManager.ts'
import CommonRoundManager from './ui/common/CommonRoundManager.ts'
import GameRules from './ui/common/GameRules.ts'
import ConsoleCommandPerformer from './ui/console/ConsoleCommandPerformer.ts'
import ConsoleRelationRoundManager from './ui/console/ConsoleRelationRoundManager.ts'
import ConsoleRoundManager from './ui/console/ConsoleRoundManager.ts'
import ConsoleUi from './ui/console/ConsoleUi.ts'
import ConsolePlayerActionIo from './ui/console/io/ConsolePlayerActionIo.ts'
import ConsolePlayerIo from './ui/console/io/ConsolePlayerIo.ts'
import ConsolePlayerRelationActionIo from './ui/console/io/ConsolePlayerRelationActionIo.ts'
import MainMenu from './ui/console/io/MainMenu.ts'
import Printer from './ui/console/io/Printer.ts'
import Std from './ui/console/io/Std.ts'
import TribePrinter from './ui/console/io/TribePrinter.ts'
import ActionInfo from './ui/web/logic/ActionInfo.ts'
import GamePage from './ui/web/logic/GamePage.ts'
import RegularRound from './ui/web/logic/RegularRound.ts'

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
        // // // store
        this.setSingleton(CaravansStore, new CaravansStore())
        this.setSingleton(RelationsStore, new RelationsStore())
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

        this.setSingleton(Pray, new Pray())
        this.setSingleton(Alliance, new Alliance())
        this.setSingleton(Caravan, new Caravan(
            this.resolveSafely(DiceThrower),
            this.resolveSafely(RelationsStore),
            this.resolveSafely(CaravansStore),
        ))
        this.setSingleton(RemoveCaravan, new RemoveCaravan())
        this.setSingleton(PillageCaravan, new PillageCaravan())
        this.setSingleton(Hire, new Hire())
        this.setSingleton(HireOneRound, new HireOneRound())
        this.setSingleton(Quit, new Quit())
    }

    private buildApp(): void {
        this.setSingleton(CurrentGame, new CurrentGame())
        this.setSingleton(StartGameManager, new StartGameManager())
        this.setSingleton(EndGameManager, new EndGameManager(
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(TurnManager, new TurnManager(
            this.resolveSafely(CaravansStore),
        ))

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

            this.resolveSafely(Pray),
            this.resolveSafely(Alliance),
            this.resolveSafely(Caravan),
            this.resolveSafely(RemoveCaravan),
            this.resolveSafely(PillageCaravan),
            this.resolveSafely(Hire),
            this.resolveSafely(HireOneRound),
            this.resolveSafely(Quit),
        ))
        this.setSingleton(TurnDecisionManager, new TurnDecisionManager(this.resolveSafely(ActionPerformer)))
    }

    private buildUi(): void {
        this.buildCommonUi()
        this.buildConsole()
        this.buildWeb()
    }

    private buildCommonUi(): void {
        this.setSingleton(CommonRoundManager, new CommonRoundManager(
            this.resolveSafely(RelationsStore),
            this.resolveSafely(DiceThrower),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(CommonPlayerController, new CommonPlayerController())
        this.setSingleton(GameRules, new GameRules())
        this.setSingleton(CommonRelationRoundManager, new CommonRelationRoundManager(
            this.resolveSafely(RelationsStore),
            this.resolveSafely(CurrentGame),
        ))
    }

    private buildConsole(): void {
        this.setSingleton(Std, new Std())
        this.setSingleton(TribePrinter, new TribePrinter())
        this.setSingleton(Printer, new Printer())

        this.setSingleton(MainMenu, new MainMenu(
            this.resolveSafely(Std),
            this.resolveSafely(GameRules),
        ))
        this.setSingleton(ConsolePlayerActionIo, new ConsolePlayerActionIo(
            this.resolveSafely(Std),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(ConsolePlayerRelationActionIo, new ConsolePlayerRelationActionIo(this.resolveSafely(Std)))
        this.setSingleton(ConsolePlayerIo, new ConsolePlayerIo(
            this.resolveSafely(Std),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(ConsoleRelationRoundManager, new ConsoleRelationRoundManager(
            this.resolveSafely(RelationsStore),
            this.resolveSafely(ConsolePlayerRelationActionIo),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(CommonRelationRoundManager),
        ))
        this.setSingleton(ConsoleCommandPerformer, new ConsoleCommandPerformer(
            this.resolveSafely(Std),
            this.resolveSafely(TribePrinter),
            this.resolveSafely(Printer),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(ConsoleRoundManager, new ConsoleRoundManager(
            this.resolveSafely(DiceThrower),
            this.resolveSafely(Std),
            this.resolveSafely(TurnManager),
            this.resolveSafely(TurnDecisionManager),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(ConsolePlayerActionIo),
            this.resolveSafely(ConsoleRelationRoundManager),
            this.resolveSafely(RelationsStore),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(CommonRoundManager),
        ))
        this.setSingleton(ConsoleUi, new ConsoleUi(
            this.resolveSafely(ConsoleRoundManager),
            this.resolveSafely(ConsoleRelationRoundManager),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(ConsolePlayerIo),
            this.resolveSafely(CurrentGame),
        ))
    }

    private buildWeb(): void {
        this.setSingleton(GamePage, new GamePage(
            this.resolveSafely(ConsoleRelationRoundManager),
            this.resolveSafely(CommonPlayerController),
            this.resolveSafely(CurrentGame),
            this.resolveSafely(TurnManager),
            this.resolveSafely(RelationsStore),
        ))
        this.setSingleton(ActionInfo, new ActionInfo(
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(RegularRound, new RegularRound(
            this.resolveSafely(CurrentGame),
            this.resolveSafely(TurnManager),
            this.resolveSafely(RelationsStore),
            this.resolveSafely(CommonRoundManager),
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
