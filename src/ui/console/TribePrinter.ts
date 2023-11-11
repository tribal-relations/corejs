import YAML from 'yaml'
import type Tribe from '../../domain/entity/Tribe'

class TribePrinter {
    getString(tribe: Tribe): string {
        const tribeWithOnlyNecessaryFields = {
            Name: tribe.name,
            Radius: tribe.radius,
            Gold: tribe.gold,
            Points: tribe.points,
            Population: tribe.population,
            'Military Power': tribe.militaryPower,
            Culture: tribe.culture,
            Production: tribe.production,
            Mercantility: tribe.mercantility,
            Technologies: tribe.technologies,

        }

        return YAML.stringify(tribeWithOnlyNecessaryFields)
    }
}

export default TribePrinter
