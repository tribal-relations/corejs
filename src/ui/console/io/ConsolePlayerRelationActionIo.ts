import type Std from './Std.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import type RelationName from '../../../domain/enum/RelationName.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'
import CannotGetTribeRelationsFromCli from '../../../exception/console/CannotGetTribeRelationsFromCli.ts'
import InsufficientCliParameters from '../../../exception/InsufficientCliParameters.ts'
import RelationCliShorthandNotFound from '../../../exception/not-found/RelationCliShorthandNotFound.ts'
import ConsolePlayerRelationActionRepository from '../repository/ConsolePlayerRelationActionRepository.ts'

class ConsolePlayerRelationActionIo {
    constructor(
        private readonly _std: Std,
    ) {
    }

    public getRelationsTowardsOtherTribes(tribe: Tribe, otherTribesNames: TribeName[]): Array<{ 'tribeName': TribeName, 'relationName': RelationName }> {
        let rawDecision: string
        const otherTribesNamesCommaSeparated = otherTribesNames.join(', ')
        const defaultRelations = otherTribesNames.map((_value: TribeName) => 'e').join(' ')

        for (; ;) {
            try {
                rawDecision = this._std.in(`${tribe.name} Relations towards ${otherTribesNamesCommaSeparated} respectively >`) ?? defaultRelations

                return this.getRelationsFromRawDecision(rawDecision, otherTribesNames)
            } catch (error) {
                if (error instanceof CannotGetTribeRelationsFromCli) {
                    this._std.out(error.message)
                } else if (error instanceof RelationCliShorthandNotFound) {
                    this._std.out(error.message)
                } else {
                    throw error
                }
            }
        }
    }

    private getRelationsFromRawDecision(rawDecision: string, otherTribesNames: TribeName[]): Array<{ 'tribeName': TribeName, 'relationName': RelationName }> {
        const words = rawDecision.split(' ')
        const relations = []

        if (rawDecision === 'q') { // sorry for hardcode
            return []
        }
        if (words.length !== otherTribesNames.length) {
            throw new InsufficientCliParameters(otherTribesNames.length, words.length)
        }

        for (let i = 0; i < otherTribesNames.length; ++i) {
            const relation = this.getRelationFromWord(words[i])
            relations.push({ tribeName: otherTribesNames[i], relationName: relation })
        }
        return relations
    }

    private getRelationFromWord(word: string): RelationName {
        if (word in ConsolePlayerRelationActionRepository.cliParameterToRelationNameMap) {
            return ConsolePlayerRelationActionRepository.cliParameterToRelationNameMap[word]
        }
        throw new RelationCliShorthandNotFound(word)
    }
}

export default ConsolePlayerRelationActionIo
