import YAML from 'yaml'
import Currency from '../../domain/entity/Currency.ts'
import type Tribe from '../../domain/entity/Tribe.ts'


class TribePrinter {
    public getString(tribe: Tribe): string {
        const tribeWithOnlyNecessaryFields = {
            Name: tribe.name,
            Radius: tribe.radius,
            [Currency.Gold]: tribe.gold,
            [Currency.Points]: tribe.points,
            [Currency.Population]: tribe.population,
            [Currency.MilitaryPower]: tribe.militaryPower,
            [Currency.Culture]: tribe.culture,
            [Currency.Production]: tribe.production,
            [Currency.Mercantility]: tribe.mercantility,
            Technologies: tribe.technologies,
        }

        return YAML.stringify(tribeWithOnlyNecessaryFields)
    }
}

export default TribePrinter
