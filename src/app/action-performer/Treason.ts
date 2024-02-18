import type ActionInterface from './ActionInterface.ts'
import type TreasonPlayerAction from '../../domain/entity/action/TreasonPlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import PlaystyleLabel from '../../domain/enum/PlaystyleLabel.ts'
import type AlliancesStore from '../../domain/store/AlliancesStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'

class Treason implements ActionInterface {
    actionName = ActionName.Treason

    constructor(
        private readonly _alliancesStore: AlliancesStore,

    ) {
    }

    public perform(playerAction: TreasonPlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.recipient.name) {
            throw new ActionUnsuccessful(ActionName.Alliance, 'Cannot betray yourself.')
        }

        if (!this._alliancesStore.doesXHaveAllianceWithY(playerAction.actor.name, playerAction.recipient.name)) {
            throw new ActionUnsuccessful(ActionName.Alliance, `Cannot betray ${playerAction.recipient.name}: not allied.`)
        }
        this._alliancesStore.removeAlliance(
            playerAction.actor.name,
            playerAction.recipient.name,
        )
        playerAction.actor.addLabel(PlaystyleLabel.Traitor)
        playerAction.recipient.addLabel(PlaystyleLabel.Betrayed)
    }
}

export default Treason
