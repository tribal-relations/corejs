import ActionPerformer from './app/ActionPerformer'
import CurrentGame from './app/CurrentGame'
import EndGameManager from './app/EndGameManager'
import RelationsManager from './app/RelationsManager'
import StartGameManager from './app/StartGameManager'
import TurnDecisionManager from './app/TurnDecisionManager'
import TurnManager from './app/TurnManager'
import Arm from './domain/action-performer/Arm'
import AttackTile from './domain/action-performer/AttackTile'
import AttackTribe from './domain/action-performer/AttackTribe'
import Conquer from './domain/action-performer/Conquer'
import Cult from './domain/action-performer/Cult'
import Expedition from './domain/action-performer/Expedition'
import GoTo1stRadius from './domain/action-performer/GoTo1stRadius'
import GoTo2ndRadius from './domain/action-performer/GoTo2ndRadius'
import GoTo3rdRadius from './domain/action-performer/GoTo3rdRadius'
import Research from './domain/action-performer/Research'
import Rome from './domain/entity/Rome'
import DiceThrower from './domain/helper/DiceThrower'
import FightManager from './domain/helper/FightManager'
import NotInContainer from './exception/internal/NotInContainer'
import ExceptionHandler from './exception-handler/ExceptionHandler'
import BrowserGameProcess from './outer/BrowserGameProcess'
import ConsoleGameProcess from './outer/ConsoleGameProcess'
import TribalRelationsGame from './outer/TribalRelationsGame'
import CommonPlayerController from './ui/common/CommonPlayerController'
import CommonRoundManager from './ui/common/CommonRoundManager'
import ConsoleCommandPerformer from './ui/console/ConsoleCommandPerformer'
import ConsolePlayerController from './ui/console/ConsolePlayerController'
import ConsoleUi from './ui/console/ConsoleUi'
import MainMenu from './ui/console/MainMenu'
import PlayerActionGetter from './ui/console/PlayerActionGetter'
import PlayerRelationActionGetter from './ui/console/PlayerRelationActionGetter'
import Printer from './ui/console/Printer'
import RelationRoundManager from './ui/console/RelationRoundManager'
import RoundManager from './ui/console/RoundManager'
import Std from './ui/console/Std'
import TribePrinter from './ui/console/TribePrinter'
import GamePage from './ui/web/logic/GamePage'
import WebUi from './ui/web/WebUi'

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

    public resolve(className: Function, throwOnNotFound: boolean = true): object | null {
        if (className.name in this.singletonToInstanceMap) {
            return this.singletonToInstanceMap[className.name]
        }

        if (throwOnNotFound) {
            throw new NotInContainer(className.name)
        }

        return null
    }

    public clearInstances(): void {
        this.singletonToInstanceMap = {}
    }

    public rebuildMap(): void {
        this.buildMap()
    }

    public setMock(className: Function, instance: object): void {
        this.singletonToInstanceMap[className.name] = instance
        this.singletonToInstanceMap[instance.constructor.name] = instance
    }

    private setSingleton(className: Function, instance: object, override: boolean = false): void {
        if (className.name in this.singletonToInstanceMap && !override) {
            return
        }
        this.singletonToInstanceMap[className.name] = instance
    }

    private buildIndependentSingletons(): void {
        // src
        // // exception
        this.setSingleton(ExceptionHandler, new ExceptionHandler())

        // // ui
        this.setSingleton(Std, new Std())

        // // // console
        this.setSingleton(TribePrinter, new TribePrinter())
        this.setSingleton(Printer, new Printer())

        // // domain
        // // // action
        this.setSingleton(Research, new Research())
        this.setSingleton(Arm, new Arm())
        this.setSingleton(GoTo3rdRadius, new GoTo3rdRadius())
        this.setSingleton(GoTo2ndRadius, new GoTo2ndRadius())
        this.setSingleton(GoTo1stRadius, new GoTo1stRadius())

        // // // entity
        this.setSingleton(Rome, new Rome())

        // // // helper
        this.setSingleton(DiceThrower, new DiceThrower())

        // // app
        this.setSingleton(CurrentGame, new CurrentGame())
        this.setSingleton(StartGameManager, new StartGameManager())
        this.setSingleton(EndGameManager, new EndGameManager(
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(TurnManager, new TurnManager())
        this.setSingleton(RelationsManager, new RelationsManager())

        // // outer
        this.setSingleton(TribalRelationsGame, new TribalRelationsGame())
    }

    private buildDependentSingletons(): void {
        // src
        this.setDomainSingletons()
        this.setAppSingletons()
        this.setUiSingletons()

        // // outer
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

    private setUiSingletons() {
        // // ui
        // // // common
        this.setSingleton(CommonRoundManager, new CommonRoundManager(this.resolveSafely(RelationsManager)))

        // // // console
        this.setSingleton(MainMenu, new MainMenu(this.resolveSafely(Std)))
        this.setSingleton(PlayerActionGetter, new PlayerActionGetter(
            this.resolveSafely(Std),
            this.resolveSafely(CurrentGame),
        ))
        this.setSingleton(PlayerRelationActionGetter, new PlayerRelationActionGetter(this.resolveSafely(Std)))
        this.setSingleton(CommonPlayerController, new CommonPlayerController())
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

        // // ui-root
        this.setSingleton(ConsoleUi, new ConsoleUi(
            this.resolveSafely(RoundManager),
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(ConsolePlayerController),
            this.resolveSafely(CurrentGame),
        ))

        this.setSingleton(GamePage, new GamePage(
            this.resolveSafely(RelationRoundManager),
            this.resolveSafely(CommonPlayerController),
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

    private setAppSingletons() {
        // // app
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

    private setDomainSingletons() {
        // // domain
        // // // action
        this.setSingleton(FightManager, new FightManager(this.resolveSafely(Rome)))
        this.setSingleton(Conquer, new Conquer(this.resolveSafely(FightManager)))
        this.setSingleton(Cult, new Cult(this.resolveSafely(DiceThrower)))
        this.setSingleton(Expedition, new Expedition(this.resolveSafely(DiceThrower)))
        this.setSingleton(AttackTile, new AttackTile(this.resolveSafely(FightManager)))
        this.setSingleton(AttackTribe, new AttackTribe(this.resolveSafely(FightManager)))
    }

    private buildMap(): void {
        this.buildIndependentSingletons()
        this.buildDependentSingletons()
    }
}

const container = new NaiveDiContainer()

export { container }
