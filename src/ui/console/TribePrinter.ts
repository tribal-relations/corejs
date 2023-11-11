import YAML from 'yaml'
import type Tribe from '../../domain/entity/Tribe'

class TribePrinter {
    getString(tribe: Tribe): string {
        const tribeWithOnlyNecessaryFields = {
            Name: tribe.name,
            Radius: tribe.radius,
            Wealth: tribe.wealth,
            Points: tribe.points,
            Population: tribe.total,
            'Combat Readiness': tribe.combatReadiness,
            Culture: tribe.culture,
            Production: tribe.production,
            'Trading Ability': tribe.tradingAbility,
            Technologies: tribe.technologies,

        }

        return YAML.stringify(tribeWithOnlyNecessaryFields)
    }
}

export default TribePrinter
