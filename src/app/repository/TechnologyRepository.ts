import Technology from '../../domain/entity/Technology'
import TechnologyName from '../../domain/enum/TechnologyName'

const techs: Record<TechnologyName, { name: TechnologyName, description: string, prerequisites: Record<string, boolean> }> = {
    Pottery: {
        name: TechnologyName.Pottery,
        description: 'Harvest result +2',
        prerequisites: {},
    },
    'Animal Husbandry': {
        name: TechnologyName.AnimalHusbandry,
        description: 'Pasture +2 Food',
        prerequisites: {},
    },
    Hunting: {
        name: TechnologyName.Hunting,
        description: 'Forest +1 Food',
        prerequisites: {},
    },
    Plough: {
        name: TechnologyName.Plough,
        description: 'Harvest result +2. Throw 2 dice if Animal Husbandry is discovered',
        prerequisites: {
            Calendar: true,
        },
    },
    'Advanced Writing': {
        name: TechnologyName.AdvancedWriting,
        description: 'Culture *2',
        prerequisites: {
            'Primitive Writing': true,
        },
    },
    Fishing: {
        name: TechnologyName.Fishing,
        description: 'River and Lake +2 Food',
        prerequisites: {},
    },
    Archery: {
        name: TechnologyName.Archery,
        description: 'Combat Readiness *2',
        prerequisites: {},
    },
    'Organized Army': {
        name: TechnologyName.OrganizedArmy,
        description: 'Combat Readiness *3',
        prerequisites: {
            'Bronze Weapons': true,
        },
    },
    'Musical Instruments': {
        name: TechnologyName.MusicalInstruments,
        description: 'Culture *2',
        prerequisites: {},
    },
    'Bronze Weapons': {
        name: TechnologyName.BronzeWeapons,
        description: 'Metal +1 Wealth +1 Production. Combat Readiness *2',
        prerequisites: {
            'Stone Working': true,
        },
    },
    Idols: {
        name: TechnologyName.Idols,
        description: 'Stone +2 Culture',
        prerequisites: {
            'Stone Working': true,
        },
    },
    Poetry: {
        name: TechnologyName.Poetry,
        description: 'Culture *2',
        prerequisites: {},
    },
    Calendar: {
        name: TechnologyName.Calendar,
        description: 'Food *2',
        prerequisites: {
            'Primitive Writing': true,
        },
    },
    'Primitive Writing': {
        name: TechnologyName.PrimitiveWriting,
        description: 'Wealth +3',
        prerequisites: {
            Pottery: true,
        },
    },
    'Stone Working': {
        name: TechnologyName.StoneWorking,
        description: 'Stone +2 Production +1 Culture',
        prerequisites: {},
    },
}

class TechnologyRepository {
    static technologiesCount = 15

    public static createFromName(name: TechnologyName): Technology {
        return new Technology(String(name), techs[name].description, techs[name].prerequisites)
    }
}

export default TechnologyRepository
