import NotFoundException from '../../exception/not-found/NotFoundException.ts'
import Relation from '../entity/Relation.ts'
import RelationName from '../enum/RelationName.ts'

class RelationRepository {
    private static readonly _rawData: Record<RelationName, { name: RelationName, agent_bonus: number, recipient_bonus: number }> = {
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

    private static readonly _instances = {
        [RelationName.Equals]: RelationRepository.create(RelationName.Equals),
        [RelationName.Respectables]: RelationRepository.create(RelationName.Respectables),
        [RelationName.Proteges]: RelationRepository.create(RelationName.Proteges),
        [RelationName.KnowItAlls]: RelationRepository.create(RelationName.KnowItAlls),
        [RelationName.Barbarians]: RelationRepository.create(RelationName.Barbarians),
        [RelationName.Rogues]: RelationRepository.create(RelationName.Rogues),
        [RelationName.Bourgeois]: RelationRepository.create(RelationName.Bourgeois),
        [RelationName.Mates]: RelationRepository.create(RelationName.Mates),
        [RelationName.Idols]: RelationRepository.create(RelationName.Idols),
        [RelationName.Cannibals]: RelationRepository.create(RelationName.Cannibals),
    }

    public static get(name: RelationName): Relation {
        if (name in RelationRepository._instances) {
            return RelationRepository._instances[name]
        }
        throw new NotFoundException('Relation', name)
    }

    private static create(name: RelationName): Relation {
        return new Relation(
            name,
            RelationRepository._rawData[name].agent_bonus,
            RelationRepository._rawData[name].recipient_bonus,
        )
    }
}

export default RelationRepository
