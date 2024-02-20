import type ActionInterface from './ActionInterface.ts'
import type ResearchPlayerAction from '../../domain/entity/action/ResearchPlayerAction.ts'
import Currency from '../../domain/entity/static/Currency.ts'
import type Technology from '../../domain/entity/static/Technology.ts'
import TileBonus from '../../domain/entity/TileBonus.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import ResourceName from '../../domain/enum/ResourceName.ts'
import TechnologyName from '../../domain/enum/TechnologyName.ts'
import TileBonusName from '../../domain/enum/TileBonusName.ts'
import AlreadyKnownTechnology from '../../exception/AlreadyKnownTechnology.ts'
import InvalidChoice from '../../exception/InvalidChoice.ts'
import UnavailableTechnology from '../../exception/UnavailableTechnology.ts'
import type TribeManager from '../TribeManager.ts'

class Research implements ActionInterface {
    actionName = ActionName.Research

    constructor(
        private readonly _tribeManager: TribeManager,

    ) {
    }

    public perform(action: ResearchPlayerAction, _turn: Turn): void {
        try {
            this._tribeManager.research(action.actor, action.technology)
            this.addTechnologyBonus(action.actor, action.technology)
        } catch (error) {
            if (error instanceof AlreadyKnownTechnology) {
                throw new InvalidChoice('You entered already known technology.')
            }
            if (error instanceof UnavailableTechnology) {
                throw new InvalidChoice('You entered unavailable technology. Consult technology tree.')
            }

            throw error
        }
    }

    private addTechnologyBonus(actor: Tribe, technology: Technology): void {
        if (technology.name === TechnologyName.AdvancedWriting) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.AdvancedWritingCulture,
                2,
                Currency.Culture,
                null,
                true,
            ))
        }
        if (technology.name === TechnologyName.AnimalHusbandry) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.AnimalHusbandryPastureFood,
                1,
                Currency.Food,
                ResourceName.Pasture,
            ))
        }
        if (technology.name === TechnologyName.Archery) {
            // done elsewhere
        }
        if (technology.name === TechnologyName.BronzeWeapons) {
            // also done elsewhere

            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.BronzeWeaponsMetalMercantility,
                1,
                Currency.Mercantility,
                ResourceName.Metal,
            ))
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.BronzeWeaponsMetalProduction,
                1,
                Currency.Production,
                ResourceName.Metal,
            ))
        }
        if (technology.name === TechnologyName.Calendar) {
            // done elsewhere

        }
        if (technology.name === TechnologyName.Fishing) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.FishingRiverFood,
                2,
                Currency.Food,
                ResourceName.River,
            ))
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.FishingLakeFood,
                2,
                Currency.Food,
                ResourceName.Lake,
            ))
        }
        if (technology.name === TechnologyName.Hunting) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.HuntingForestFood,
                1,
                Currency.Food,
                ResourceName.Forest,
            ))
        }
        if (technology.name === TechnologyName.Idols) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.IdolsStoneCulture,
                2,
                Currency.Culture,
                ResourceName.Stone,
            ))
        }
        if (technology.name === TechnologyName.MusicalInstruments) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.MusicalInstrumentsCulture,
                2,
                Currency.Culture,
                null,
                true,
            ))
        }

        if (technology.name === TechnologyName.OrganizedArmy) {
            // done elsewhere

        }
        if (technology.name === TechnologyName.Plough) {
            // done elsewhere

        }
        if (technology.name === TechnologyName.Poetry) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.PoetryCulture,
                2,
                Currency.Culture,
                null,
                true,
            ))
        }
        if (technology.name === TechnologyName.Pottery) {
            // done elsewhere

        }
        if (technology.name === TechnologyName.PrimitiveWriting) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.PoetryCulture,
                3,
                Currency.Mercantility,
                null,
                false,
            ))
        }
        if (technology.name === TechnologyName.StoneWorking) {
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.StoneWorkingStoneProduction,
                2,
                Currency.Production,
                ResourceName.Stone,
            ))
            actor.addTileBonus(new TileBonus(
                actor,
                TileBonusName.StoneWorkingStoneCulture,
                1,
                Currency.Culture,
                ResourceName.Stone,
            ))
        }
    }
}

export default Research
