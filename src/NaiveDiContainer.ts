import Std from "./ui/Std";
import Research from "./domain/action/Research";
import ActionPerformer from "./app/ActionPerformer";
import EndGameManager from "./app/EndGameManager";
import MainMenu from "./ui/console/MainMenu";
import ConsoleUi from "./ui/ConsoleUi";
import TurnManager from "./app/TurnManager";
import RoundManager from "./app/RoundManager";
import DiceThrower from "./domain/helper/DiceThrower";
import TurnDecisionManager from "./app/TurnDecisionManager";
import ConsoleCommandPerformer from "./ui/console/ConsoleCommandPerformer";
import TribePrinter from "./ui/console/TribePrinter";
import Printer from "./ui/console/Printer";
import StartGameManager from "./app/StartGameManager";
import Arm from "./domain/action/Arm";
import Expedition from "./domain/action/Expedition";
import GoTo3rdRadius from "./domain/action/GoTo3rdRadius";
import GoTo2ndRadius from "./domain/action/GoTo2ndRadius";
import GoTo1stRadius from "./domain/action/GoTo1stRadius";
import Conquer from "./domain/action/Conquer";
import Cult from "./domain/action/Cult";
import Rome from "./domain/entity/Rome";
import FightManager from "./domain/helper/FightManager";
import ConsoleGameProcess from "./outer/ConsoleGameProcess";
import TribalRelationsGame from "./outer/TribalRelationsGame";
import WebUi from "./ui/WebUi";

class NaiveDiContainer {
    public singletonToInstanceMap = {}

    constructor() {
        this.buildMap()
    }

    public resolve(className: Function, throwOnNotFound: boolean = true): object | null {
        if (className.name in this.singletonToInstanceMap) {
            return this.singletonToInstanceMap[className.name]
        }

        if (throwOnNotFound) {
            throw new Error(`class ${className.name} not found in container`)
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
            this.resolve(StartGameManager),
            this.resolve(ConsoleUi),
            this.resolve(EndGameManager),
            this.resolve(MainMenu),
        ))
    }

    private setUiSingletons() {
        // // ui
        // // // console
        this.setSingleton(MainMenu, new MainMenu(this.resolve(Std)))
        this.setSingleton(ConsoleCommandPerformer, new ConsoleCommandPerformer(
            this.resolve(Std),
            this.resolve(TribePrinter),
            this.resolve(Printer),
        ))
        // // ui-root
        this.setSingleton(ConsoleUi, new ConsoleUi(
            this.resolve(TurnManager),
            this.resolve(RoundManager),
            this.resolve(TurnDecisionManager),
            this.resolve(Std),
            this.resolve(ConsoleCommandPerformer),
        ))
        this.setSingleton(ConsoleUi, new WebUi(
            this.resolve(TurnManager),
            this.resolve(TurnDecisionManager),
        ))
    }

    private setAppSingletons() {
        // // app
        this.setSingleton(RoundManager, new RoundManager(this.resolve(DiceThrower)))
        this.setSingleton(ActionPerformer, new ActionPerformer(
            this.resolve(Arm),
            this.resolve(Research),
            this.resolve(Expedition),
            this.resolve(GoTo3rdRadius),
            this.resolve(GoTo2ndRadius),
            this.resolve(GoTo1stRadius),
            this.resolve(Conquer),
            this.resolve(Cult),
        ))
        this.setSingleton(TurnDecisionManager, new TurnDecisionManager(this.resolve(ActionPerformer)))
    }

    private setDomainSingletons() {
        // // domain
        // // // action
        this.setSingleton(FightManager, new FightManager(this.resolve(Rome)))
        this.setSingleton(Conquer, new Conquer(this.resolve(FightManager)))
        this.setSingleton(Cult, new Cult(this.resolve(DiceThrower)))
        this.setSingleton(Expedition, new Expedition(this.resolve(DiceThrower)))
    }

    private buildMap(): void {
        this.buildIndependentSingletons()
        this.buildDependentSingletons()
    }
}

const container = new NaiveDiContainer()

export {
    container
}
