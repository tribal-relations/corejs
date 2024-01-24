import RelationName from '../../../domain/enum/RelationName.ts'

class ConsolePlayerRelationActionRepository {
    static cliParameterToRelationNameMap: Record<string, RelationName> = {
        c: RelationName.Cannibals,
        ba: RelationName.Barbarians,
        ro: RelationName.Rogues,
        bo: RelationName.Bourgeois,
        kia: RelationName.KnowItAlls,
        e: RelationName.Equals,
        re: RelationName.Respectables,
        ma: RelationName.Mates,
        pr: RelationName.Proteges,
        id: RelationName.Idols,
    }
}

export default ConsolePlayerRelationActionRepository
