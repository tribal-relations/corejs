import YAML from 'yaml'
import type TribeManager from '../../../app/TribeManager.ts'
import Currency from '../../../domain/entity/static/Currency.ts'
import type Resource from '../../../domain/entity/static/Resource.js'
import type Tribe from '../../../domain/entity/Tribe.ts'
import type ResourceName from '../../../domain/enum/ResourceName.js'
import type ResourceRepository from '../../../domain/repository/ResourceRepository'

class TribePrinter {
    constructor(
        private readonly _tribeManager: TribeManager,
        private readonly _resourceRepository: ResourceRepository,
    ) {
    }

    public getStructure(tribe: Tribe): object {
        const tribeWithOnlyNecessaryFields = {
            Name: tribe.name,
            Radius: tribe.radius,
            [Currency.Gold]: tribe.gold,
            [Currency.Points]: tribe.points,
            [Currency.Food]: tribe.food,
            [Currency.Population]: tribe.population,
            [Currency.MilitaryPower]: tribe.militaryPower,
            [Currency.Culture]: tribe.culture,
            [Currency.Production]: tribe.production,
            [Currency.Mercantility]: tribe.mercantility,
        }

        return tribeWithOnlyNecessaryFields
    }

    public getStructureFull(tribe: Tribe): object {
        const resources = this.getResources(tribe)
        const technologies = Object.keys(tribe.technologies)
        const bonuses = Object.keys(tribe.bonuses)
        const temporaryBonuses = Object.keys(tribe.bonusesForOneRound)

        const tribeWithOnlyNecessaryFields = this.getStructure(tribe)
        tribeWithOnlyNecessaryFields.Tiles = resources
        tribeWithOnlyNecessaryFields.Technologies = technologies
        tribeWithOnlyNecessaryFields.Bonuses = bonuses
        tribeWithOnlyNecessaryFields['Temporary bonuses'] = temporaryBonuses

        return tribeWithOnlyNecessaryFields
    }

    public getStructureForStatistics(tribe: Tribe): object {
        const labels = Object.keys(tribe.labels)

        const tribeWithOnlyNecessaryFields = this.getStructure(tribe)
        tribeWithOnlyNecessaryFields.Labels = labels

        return tribeWithOnlyNecessaryFields
    }

    public getString(tribe: Tribe): string {
        return YAML.stringify(this.getStructure(tribe))
    }

    public getStringFull(tribe: Tribe): string {
        return YAML.stringify(this.getStructureFull(tribe))
    }

    private getResources(tribe: Tribe): string[] {
        return this._tribeManager.getUniqueResourceNames(tribe)
            .map((value: ResourceName) => this.getTile(this._resourceRepository.get(value), tribe.resources[value]))
    }

    private getTile(tile: Resource, count: number = 1): string {
        const spacesAfterName = this.getSpacesAfterName(tile.name)

        const spaces = '    '
        const food = tile.food ? `${tile.food}🍏${spaces}` : ''
        const prod = tile.production ? `${tile.production}🛠${spaces}` : ''
        const culture = tile.culture ? `${tile.culture}🎵${spaces}` : ''
        const merc = tile.mercantility ? `${tile.mercantility}💰${spaces}` : ''

        return `${count} ${tile.name}${spacesAfterName}${food}${prod}${culture}${merc}`.trim()
    }

    private getSpacesAfterName(tile: ResourceName): string {
        // longest resource name is Pasture, 7 chars
        // shortest is Gold, 4 chars
        let numberOfSpacesAfterName = 1
        if (tile.length < 7) {
            numberOfSpacesAfterName = 7 - tile.length + 1
        }
        return ' '.repeat(numberOfSpacesAfterName)
    }
}

export default TribePrinter
