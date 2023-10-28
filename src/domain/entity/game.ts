import Player from "./player";
import WinningCondition from "./winning-condition"
import Turn from "./turn";

class Game {
    constructor(
        private _players: Array<Player>,
        private _name: string,
        private _startDate: Date = new Date(),
        private _endDate: Date | null = null,
        private _currentTurnNumber: number = 1,
        private _currentTurn: Turn | null = null,
        private _isStarted: boolean = false,
        private _isFinished: boolean = false,
        private _winner: Player | null = null,
        private _winningCondition: WinningCondition | null = null,
    ) {
    }

    get players(): Array<Player> {
        return this._players;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date | null {
        return this._endDate;
    }

    get currentTurnNumber(): number {
        return this._currentTurnNumber;
    }

    get currentTurn(): Turn | null {
        return this._currentTurn;
    }

    get name(): string {
        return this._name;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }

    get winner(): Player | null {
        return this._winner;
    }

    get winningCondition(): WinningCondition | null {
        return this._winningCondition;
    }

    set players(players: Array<Player>) {
        this._players = players;
    }

    set startDate(startDate: Date) {
        this._startDate = startDate;
    }

    set endDate(endDate: Date) {
        this._endDate = endDate;
    }

    set currentTurnNumber(n: number) {
        this._currentTurnNumber = n;
    }

    set currentTurn(t: Turn) {
        this._currentTurn = t;
    }

    set name(name: string) {
        this._name = name;
    }

    set isStarted(isStarted: boolean) {
        this._isStarted = isStarted;
    }

    set isFinished(isFinished: boolean) {
        this._isFinished = isFinished;
    }

    set winner(winner: Player) {
        this._winner = winner;
    }

    set winningCondition(winningCondition: WinningCondition) {
        this._winningCondition = winningCondition;
    }
}

export default Game



