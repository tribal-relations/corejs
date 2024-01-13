import Relation from '../entity/Relation.ts'
import RelationName from '../enum/RelationName.ts'

const relations: Record<RelationName, { name: RelationName, agent_bonus: number, recipient_bonus: number }> = {
    [RelationName.Equals]: {
        name: RelationName.Equals,
        agent_bonus: 0,
        recipient_bonus: 0,
    },
    [RelationName.Respectables]: {
        name: RelationName.Respectables,
        agent_bonus: 1,
        recipient_bonus: 2,
    },
    [RelationName.Proteges]: {
        name: RelationName.Proteges,
        agent_bonus: 1,
        recipient_bonus: 4,
    },
    [RelationName.KnowItAlls]: {
        name: RelationName.KnowItAlls,
        agent_bonus: 1,
        recipient_bonus: -1,
    },
    [RelationName.Barbarians]: {
        name: RelationName.Barbarians,
        agent_bonus: 1,
        recipient_bonus: -2,
    },
    [RelationName.Rogues]: {
        name: RelationName.Rogues,
        agent_bonus: 2,
        recipient_bonus: -1,
    },
    [RelationName.Bourgeois]: {
        name: RelationName.Bourgeois,
        agent_bonus: 2,
        recipient_bonus: 0,
    },
    [RelationName.Mates]: {
        name: RelationName.Mates,
        agent_bonus: 2,
        recipient_bonus: 2,
    },
    [RelationName.Idols]: {
        name: RelationName.Idols,
        agent_bonus: 3,
        recipient_bonus: 2,
    },
    [RelationName.Cannibals]: {
        name: RelationName.Cannibals,
        agent_bonus: 0,
        recipient_bonus: -3,
    },
}

class RelationRepository {
    static relationsCount = 10

    public static createFromName(name: RelationName): Relation {
        return new Relation(name, relations[name].agent_bonus, relations[name].recipient_bonus)
    }
}

export default RelationRepository
