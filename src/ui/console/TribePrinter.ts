import YAML from 'yaml'
import type Tribe from '../../domain/entity/Tribe'

class TribePrinter {
    getString(tribe: Tribe): string {
        const tribeWithOnlyNecessaryFields = {
            Name: tribe.name,
            Radius: tribe.radius,
            Wealth: tribe.wealth,
            Points: tribe.points,
            Population: tribe.population.total,
            'Combat Readiness': tribe.population.combatReadiness,
            Civilizedness: tribe.population.civilizedness,
            Culture: tribe.territory.culture,
            Production: tribe.territory.production,
            'Trading Ability': tribe.territory.tradingAbility,
            Technologies: tribe.technologies,

        }

        return YAML.stringify(tribeWithOnlyNecessaryFields)
    }
}

export default TribePrinter
