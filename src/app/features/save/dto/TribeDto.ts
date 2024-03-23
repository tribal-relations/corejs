import type Bonus from '../../../../domain/entity/static/Bonus.ts'
import type BonusInterface from '../../../../domain/entity/static/BonusInterface.ts'
import type Tile from '../../../../domain/entity/Tile.ts'
import type TileBonus from '../../../../domain/entity/TileBonus.ts'
import type BonusName from '../../../../domain/enum/BonusName.ts'
import type PlaystyleLabel from '../../../../domain/enum/PlaystyleLabel.ts'
import type TechnologyName from '../../../../domain/enum/TechnologyName.ts'
import type TribeName from '../../../../domain/enum/TribeName.ts'

class TribeDto {
    constructor(
        private readonly _name: TribeName,
        private readonly _points: number = 0,
        private readonly _gold: number = 0,
        private readonly _food: number = 0,
        private readonly _population: number = 0,
        private readonly _militaryPower: number = 0,
        private readonly _culture: number = 0,
        private readonly _production: number = 0,
        private readonly _mercantility: number = 0,
        private readonly _technologies: Record<TechnologyName, boolean> = Object(),
        private readonly _tiles: Tile[] = [],
        private readonly _bonuses: Record<BonusName, BonusInterface> = Object(),
        private readonly _tileBonuses: Record<BonusName, TileBonus> = Object(),
        private readonly _bonusesForOneRound: Record<BonusName, Bonus> = Object(),
        private readonly _labels: Record<PlaystyleLabel, boolean> = Object(),
        private readonly _radius: number = 4,
    ) {
    }

    // static createFromTribe(tribe: Tribe): TribeDto {
    //     const dto = new TribeDto(
    //         TribeDto.createFromTribe(player.tribe),
    //         player.name,
    //     )
    //
    //     return dto
    // }

    get radius(): number {
        return this._radius
    }

    get bonuses(): Record<BonusName, BonusInterface> {
        return this._bonuses
    }

    get tileBonuses(): Record<BonusName, TileBonus> {
        return this._tileBonuses
    }

    get bonusesForOneRound(): Record<BonusName, Bonus> {
        return this._bonusesForOneRound
    }

    get name(): TribeName {
        return this._name
    }

    get gold(): number {
        return this._gold
    }

    get points(): number {
        return this._points
    }

    get population(): number {
        return this._population
    }

    get militaryPower(): number {
        return this._militaryPower
    }

    get food(): number {
        return this._food
    }

    get technologies(): Record<TechnologyName, boolean> {
        return this._technologies
    }

    get labels(): Record<PlaystyleLabel, boolean> {
        return this._labels
    }

    get tiles(): Tile[] {
        return this._tiles
    }

    get culture(): number {
        return this._culture
    }

    get production(): number {
        return this._production
    }

    get mercantility(): number {
        return this._mercantility
    }
}

export default TribeDto
