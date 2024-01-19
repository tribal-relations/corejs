import type Std from './Std.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import RelationName from '../../../domain/enum/RelationName.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'
import CannotGetTribeRelationsFromCli from '../../../exception/console/CannotGetTribeRelationsFromCli.ts'
import InsufficientCliParameters from '../../../exception/InsufficientCliParameters.ts'
import RelationNotFound from '../../../exception/not-found/RelationNotFound.ts'

class ConsolePlayerRelationActionIo {
    _cliParameterToRelationNameMap: Record<string, RelationName> = {
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

    constructor(
        private readonly _std: Std,
    ) {
    }

    get std(): Std {
        return this._std
    }

    public getRelationsTowardsOtherTribes(tribe: Tribe, otherTribes: Tribe[]): Array<{ 'tribeName': TribeName, 'relationName': RelationName }> {
        let rawDecision: string
        const otherTribesNames = otherTribes.map((value: Tribe) => value.name).join(', ')
        const defaultRelations = otherTribes.map((_value: Tribe) => 'e').join(' ')

        for (; ;) {
            try {
                rawDecision = this.std.in(`${tribe.name} Relations towards ${otherTribesNames} respectively >`) ?? defaultRelations
                return this.getRelationsFromRawDecision(rawDecision, otherTribes)
            } catch (error) {
                if (error instanceof CannotGetTribeRelationsFromCli) {
                    this.std.out(error.message)
                } else {
                    throw error
                }
            }
        }
    }

    private getRelationsFromRawDecision(rawDecision: string, otherTribes: Tribe[]): Array<{ 'tribeName': TribeName, 'relationName': RelationName }> {
        const words = rawDecision.split(' ')
        const relations = []

        if (rawDecision === 'q') { // sorry for hardcode
            return []
        }
        if (words.length !== otherTribes.length) {
            throw new InsufficientCliParameters(otherTribes.length, words.length)
        }

        for (let i = 0; i < otherTribes.length; ++i) {
            const relation = this.getRelationFromWord(words[i])
            relations.push({ tribeName: otherTribes[i].name, relationName: relation })
        }
        return relations
    }

    private getRelationFromWord(word: string): RelationName {
        if (word in this._cliParameterToRelationNameMap) {
            return this._cliParameterToRelationNameMap[word]
        }
        throw new RelationNotFound(word)
    }
}

export default ConsolePlayerRelationActionIo
