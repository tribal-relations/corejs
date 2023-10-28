import "reflect-metadata"
import {container} from "tsyringe";
import Std from "../../src/ui/std";
import TurnDecisionManager from "../../src/app/turn-decision-manager";
import Turn from "../../src/domain/entity/turn";
import Player from "../../src/domain/entity/player";
import Tribe from "../../src/domain/entity/tribe";

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager);

    const tribe = new Tribe()
    const player = new Player(tribe, 'test_player')

    const turn = new Turn(player)
    const std = container.resolve(Std);
    std.sendIn('q')
    const turnResult = turnDecisionManager.processTurn(turn)

    expect(turnResult.isLast).toBe(true);
});