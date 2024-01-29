import NotFoundException from '../../exception/not-found/NotFoundException.ts'
import Relation from '../entity/Relation.ts'
import RelationName from '../enum/RelationName.ts'

class RelationRepository {
    static relationsCount = 10

    private static readonly _relationsRawData: Record<RelationName, { name: RelationName, agent_bonus: number, recipient_bonus: number }> = {
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

    private static readonly _relationInstances = {
        [RelationName.Equals]: RelationRepository.createInstanceFromName(RelationName.Equals),
        [RelationName.Respectables]: RelationRepository.createInstanceFromName(RelationName.Respectables),
        [RelationName.Proteges]: RelationRepository.createInstanceFromName(RelationName.Proteges),
        [RelationName.KnowItAlls]: RelationRepository.createInstanceFromName(RelationName.KnowItAlls),
        [RelationName.Barbarians]: RelationRepository.createInstanceFromName(RelationName.Barbarians),
        [RelationName.Rogues]: RelationRepository.createInstanceFromName(RelationName.Rogues),
        [RelationName.Bourgeois]: RelationRepository.createInstanceFromName(RelationName.Bourgeois),
        [RelationName.Mates]: RelationRepository.createInstanceFromName(RelationName.Mates),
        [RelationName.Idols]: RelationRepository.createInstanceFromName(RelationName.Idols),
        [RelationName.Cannibals]: RelationRepository.createInstanceFromName(RelationName.Cannibals),
    }

    public static get(name: RelationName): Relation {
        if (name in RelationRepository._relationInstances) {
            return RelationRepository._relationInstances[name]
        }
        throw new NotFoundException('Relation', name)
    }

    private static createInstanceFromName(name: RelationName): Relation {
        return new Relation(
            name,
            RelationRepository._relationsRawData[name].agent_bonus,
            RelationRepository._relationsRawData[name].recipient_bonus,
        )
    }
}

export default RelationRepository
