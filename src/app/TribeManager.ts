import Bonus from '../domain/entity/static/Bonus.ts'
import Currency from '../domain/entity/static/Currency.ts'
import type Rome from '../domain/entity/static/Rome'
import type Technology from '../domain/entity/static/Technology.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import ActionName from '../domain/enum/ActionName.ts'
import BonusName from '../domain/enum/BonusName.ts'
import ResourceName from '../domain/enum/ResourceName.ts'
import type TechnologyName from '../domain/enum/TechnologyName'
import type ResourceRepository from '../domain/repository/ResourceRepository.ts'
import type TechnologyRepository from '../domain/repository/TechnologyRepository.ts'
import ActionUnsuccessful from '../exception/ActionUnsuccessful.ts'
import AlreadyKnownTechnology from '../exception/AlreadyKnownTechnology.ts'
import MaximalMilitaryPower from '../exception/MaximalMilitaryPower.ts'
import TribeTileNotFound from '../exception/not-found/TribeTileNotFound.ts'
import UnavailableTechnology from '../exception/UnavailableTechnology.ts'

class TribeManager {
    public constructor(
        private readonly _technologyRepository: TechnologyRepository,
        private readonly _resourceRepository: ResourceRepository,
    ) {
    }

    public buyTroops(tribe: Tribe, amount: number, price: number): void {
        if (price > tribe.gold) {
            throw new ActionUnsuccessful(ActionName.Hire, `Buyer ${tribe.name} does not have enough gold.`)
        }
        tribe.militaryPower += amount
        tribe.gold -= price
    }

    public sellTroops(tribe: Tribe, amount: number, price: number): void {
        if (amount > tribe.militaryPower) {
            throw new ActionUnsuccessful(ActionName.Hire, `Seller ${tribe.name} does not have enough troops.`)
        }
        tribe.militaryPower -= amount
        tribe.gold += price
    }

    public buyTroopsForOneRound(tribe: Tribe, amount: number, price: number): void {
        if (price > tribe.gold) {
            throw new ActionUnsuccessful(ActionName.Hire, `Buyer ${tribe.name} does not have enough gold.`)
        }
        tribe.addBonusForOneRound(
            new Bonus(
                tribe,
                BonusName.HiredMilitaryPowerForOneRound,
                amount,
                Currency.MilitaryPower,
            ),
        )
        tribe.gold -= price
    }

    public sellTroopsForOneRound(tribe: Tribe, amount: number, price: number): void {
        if (amount > tribe.militaryPower) {
            throw new ActionUnsuccessful(ActionName.Hire, `Seller ${tribe.name} does not have enough troops.`)
        }
        tribe.addBonusForOneRound(
            new Bonus(
                tribe,
                BonusName.GivenAwayMilitaryPowerForOneRound,
                -amount,
                Currency.MilitaryPower,
            ),
        )
        tribe.gold += price
    }

    public makeTerritorialDiscovery(tribe: Tribe): void {
        this.addTile(tribe, this._resourceRepository.getRandomResourceName())
    }

    public growPopulation(tribe: Tribe, fertility: number): void {
        const amount = this.getPopulationSurplus(tribe, fertility)
        tribe.population += amount
    }

    public detachTile(tribe: Tribe, tile: ResourceName): void {
        const currentCount: number = tribe.resources[tile]
        if (currentCount) {
            tribe.resources[tile] = currentCount - 1
        } else {
            throw new TribeTileNotFound(tribe.name, tile)
        }
    }

    public addTile(tribe: Tribe, newTile: ResourceName): void {
        const currentCount: number = tribe.resources[newTile]
        if (currentCount) {
            tribe.resources[newTile] = currentCount + 1
        } else {
            tribe.resources[newTile] = 1
        }
    }

    public research(tribe: Tribe, tech: Technology): void {
        this.checkTechnologyIsNotBlocked(tribe, tech)
        tribe.technologies[String(tech.name)] = true
    }

    public researchByName(tribe: Tribe, techName: TechnologyName): void {
        this.research(tribe, this._technologyRepository.get(techName))
    }

    /**
     * Gets techs that can be researched next, so result = allTechs - already - unavailable
     */
    public getTechnologiesAvailableForResearch(tribe: Tribe): Technology[] {
        return Object.values(this._technologyRepository.getAll())
            .filter((tech: Technology) => !(tech.name in tribe.technologies))
            .filter((tech: Technology) => Object.values(tech.prerequisites).length === 0 ||
                this.arePrerequisitesMetForTechnology(tribe, tech),
            )
    }

    public takeLosses(tribe: Tribe | Rome, amount: number): void {
        this.shrink(tribe, amount)
        if (amount < tribe.militaryPower) {
            tribe.militaryPower -= amount
        } else {
            tribe.militaryPower = 1
        }
    }

    public getUniqueResourceNames(tribe: Tribe): ResourceName[] {
        return (Object.keys(tribe.resources) as ResourceName[])
    }

    public arm(tribe: Tribe): void {
        if (tribe.population === tribe.militaryPower) {
            throw new MaximalMilitaryPower(tribe.militaryPower, tribe.population)
        }

        const amount = Math.min(
            tribe.population - tribe.militaryPower,
            tribe.production,
        )

        tribe.militaryPower += amount
    }

    private shrink(tribe: Tribe | Rome, amount: number): void {
        tribe.population -= amount
        if (tribe.population < 1) {
            tribe.population = 1
        }
    }

    private arePrerequisitesMetForTechnology(tribe: Tribe, technology: Technology): boolean {
        for (const prereq in technology.prerequisites) {
            if (!(prereq in tribe.technologies)) {
                return false
            }
        }
        return true
    }

    private checkTechnologyIsNotBlocked(tribe: Tribe, tech: Technology): void {
        if (tech.name in tribe.technologies) {
            throw new AlreadyKnownTechnology(tribe.name, tech.name)
        }
        let prerequisiteName: string
        for (prerequisiteName in tech.prerequisites) {
            if (!(prerequisiteName in tribe.technologies)) {
                throw new UnavailableTechnology(tribe.name, tech.name)
            }
        }
    }

    private getPopulationSurplus(tribe: Tribe, fertility: number): number {
        const food = tribe.food
        const cropsYield = food * fertility
        const upperBound = tribe.population * 10

        if (cropsYield < upperBound) {
            return cropsYield
        }

        return upperBound
    }

    public createStarterTribe(tribe: Tribe): Tribe {
        tribe.resources[ResourceName.Pasture] = 1
        tribe.resources[ResourceName.Forest] = 1

        return tribe
    }
}

export default TribeManager
