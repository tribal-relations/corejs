import ActionPerformer from './app/ActionPerformer'
import EndGameManager from './app/EndGameManager'
import RoundManager from './app/RoundManager'
import StartGameManager from './app/StartGameManager'
import TurnDecisionManager from './app/TurnDecisionManager'
import TurnManager from './app/TurnManager'
import Arm from './domain/action-performer/Arm'
import AttackTile from './domain/action-performer/AttackTile'
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
import NotInContainer from './exception/NotInContainer'
import ConsoleGameProcess from './outer/ConsoleGameProcess'
import TribalRelationsGame from './outer/TribalRelationsGame'
import ConsoleCommandPerformer from './ui/console/ConsoleCommandPerformer'
import ConsoleUi from './ui/console/ConsoleUi'
import MainMenu from './ui/console/MainMenu'
import PlayerActionGetter from './ui/console/PlayerActionGetter'
import PlayerController from './ui/console/PlayerController'
import Printer from './ui/console/Printer'
import Std from './ui/console/Std'
import TribePrinter from './ui/console/TribePrinter'
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
        this.setSingleton(StartGameManager, new StartGameManager())
        this.setSingleton(EndGameManager, new EndGameManager())
        this.setSingleton(TurnManager, new TurnManager())

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
        ))
    }

    private setUiSingletons() {
        // // ui
        // // // console
        this.setSingleton(MainMenu, new MainMenu(this.resolveSafely(Std)))
        this.setSingleton(PlayerActionGetter, new PlayerActionGetter(this.resolveSafely(Std)))
        this.setSingleton(PlayerController, new PlayerController(this.resolveSafely(TurnManager), this.resolveSafely(Std)))

        this.setSingleton(ConsoleCommandPerformer, new ConsoleCommandPerformer(
            this.resolveSafely(Std),
            this.resolveSafely(TribePrinter),
            this.resolveSafely(Printer),
        ))
        // // ui-root
        this.setSingleton(ConsoleUi, new ConsoleUi(
            this.resolveSafely(TurnManager),
            this.resolveSafely(RoundManager),
            this.resolveSafely(TurnDecisionManager),
            this.resolveSafely(Std),
            this.resolveSafely(ConsoleCommandPerformer),
            this.resolveSafely(PlayerActionGetter),
            this.resolveSafely(PlayerController),
        ))
        this.setSingleton(ConsoleUi, new WebUi(
            this.resolveSafely(TurnManager),
            this.resolveSafely(TurnDecisionManager),
        ))
    }

    private setAppSingletons() {
        // // app
        this.setSingleton(RoundManager, new RoundManager(this.resolveSafely(DiceThrower)))
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
    }

    private buildMap(): void {
        this.buildIndependentSingletons()
        this.buildDependentSingletons()
    }
}

const container = new NaiveDiContainer()

export { container }
