import type TribeName from '../enum/TribeName.ts'

class AlliancesStore {
    public readonly allianceCaravanMultiplier = 2

    // example
    // agent: East
    // recipient: West
    // game situation: East player chooses Alliance card toward West player
    // game meaning: East and West are allies now
    // the same if West -> East
    // data structure: {"East": {"West": true}, "West": {"East": true}}
    private _alliances: Record<TribeName, Record<TribeName, boolean>> = Object()

    get alliances(): Record<TribeName, Record<TribeName, boolean>> {
        return this._alliances
    }

    set alliances(relations: Record<TribeName, Record<TribeName, boolean>>) {
        this._alliances = relations
    }

    public setAllAlliancesForTribe(agent: TribeName, relations: Record<TribeName, boolean>) {
        if (agent in this._alliances) {
            this._alliances[agent] = relations
        } else {
            this._alliances[agent] = Object()
            this._alliances[agent] = relations
        }
    }

    public setAlliance(agent: TribeName, recipient: TribeName) {
        if (agent in this._alliances) {
            this._alliances[agent][recipient] = true
        } else {
            this._alliances[agent] = Object()
            this._alliances[agent][recipient] = true
        }
        if (recipient in this._alliances) {
            this._alliances[recipient][agent] = true
        } else {
            this._alliances[recipient] = Object()
            this._alliances[recipient][agent] = true
        }
    }

    public removeAlliance(agent: TribeName, recipient: TribeName) {
        if (agent in this._alliances) {
            this._alliances[agent][recipient] = false
        } else {
            this._alliances[agent] = Object()
            this._alliances[agent][recipient] = false
        }
        if (recipient in this._alliances) {
            this._alliances[recipient][agent] = false
        } else {
            this._alliances[recipient] = Object()
            this._alliances[recipient][agent] = false
        }
    }

    public howThisTribeReactsToOthers(agent: TribeName): Record<TribeName, boolean> {
        if (agent in this._alliances) {
            return this._alliances[agent]
        }
        return Object()
    }

    public doesXHaveAllianceWithY(xName: TribeName, yName: TribeName): boolean {
        if (xName in this._alliances) {
            return this._alliances[xName][yName] ?? false
        }
        return false
    }

    public setStarterAlliances(names: TribeName[]) {
        this._alliances = Object()

        for (const agentName of names) {
            for (const recipientName of names) {
                if (agentName !== recipientName) {
                    if (!(agentName in this._alliances)) {
                        this._alliances[agentName] = Object()
                    }
                    if (!(recipientName in this._alliances)) {
                        this._alliances[recipientName] = Object()
                    }
                    this._alliances[agentName][recipientName] = false
                    this._alliances[recipientName][agentName] = false
                }
            }
        }
    }
}

export default AlliancesStore
