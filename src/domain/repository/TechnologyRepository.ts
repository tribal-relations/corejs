import BaseRepository from './BaseRepository.ts'
import Technology from '../entity/Technology.ts'
import TechnologyName from '../enum/TechnologyName.ts'

class TechnologyRepository extends BaseRepository<Technology> {
    public static readonly technologyTree = TechnologyRepository.buildTechnologyTree()

    private static readonly _techs: Record<TechnologyName, { name: TechnologyName, description: string, prerequisites: Record<string, boolean> }> = {
        [TechnologyName.Pottery]: {
            name: TechnologyName.Pottery,
            description: 'Harvest result +2',
            prerequisites: {},
        },
        [TechnologyName.AnimalHusbandry]: {
            name: TechnologyName.AnimalHusbandry,
            description: 'Pasture +2 Food',
            prerequisites: {},
        },
        [TechnologyName.Hunting]: {
            name: TechnologyName.Hunting,
            description: 'Forest +1 Food',
            prerequisites: {},
        },
        [TechnologyName.Plough]: {
            name: TechnologyName.Plough,
            description: 'Harvest result +2. Throw 2 dice if Animal Husbandry is discovered',
            prerequisites: {
                Calendar: true,
            },
        },
        [TechnologyName.AdvancedWriting]: {
            name: TechnologyName.AdvancedWriting,
            description: 'Culture *2',
            prerequisites: {
                [TechnologyName.PrimitiveWriting]: true,
            },
        },
        [TechnologyName.Fishing]: {
            name: TechnologyName.Fishing,
            description: 'River and Lake +2 Food',
            prerequisites: {},
        },
        [TechnologyName.Archery]: {
            name: TechnologyName.Archery,
            description: 'Combat Readiness *2',
            prerequisites: {},
        },
        [TechnologyName.OrganizedArmy]: {
            name: TechnologyName.OrganizedArmy,
            description: 'Combat Readiness *3',
            prerequisites: {
                [TechnologyName.BronzeWeapons]: true,
            },
        },
        [TechnologyName.MusicalInstruments]: {
            name: TechnologyName.MusicalInstruments,
            description: 'Culture *2',
            prerequisites: {},
        },
        [TechnologyName.BronzeWeapons]: {
            name: TechnologyName.BronzeWeapons,
            description: 'Metal +1 Mercantility +1 Production. Combat Readiness *2',
            prerequisites: {
                [TechnologyName.StoneWorking]: true,
            },
        },
        [TechnologyName.Idols]: {
            name: TechnologyName.Idols,
            description: 'Stone +2 Culture',
            prerequisites: {
                [TechnologyName.StoneWorking]: true,
            },
        },
        [TechnologyName.Poetry]: {
            name: TechnologyName.Poetry,
            description: 'Culture *2',
            prerequisites: {},
        },
        [TechnologyName.Calendar]: {
            name: TechnologyName.Calendar,
            description: 'Food *2',
            prerequisites: {
                [TechnologyName.PrimitiveWriting]: true,
            },
        },
        [TechnologyName.PrimitiveWriting]: {
            name: TechnologyName.PrimitiveWriting,
            description: 'Mercantility +3',
            prerequisites: {
                Pottery: true,
            },
        },
        [TechnologyName.StoneWorking]: {
            name: TechnologyName.StoneWorking,
            description: 'Stone +2 Production +1 Culture',
            prerequisites: {},
        },
    }

    protected readonly instances: Record<TechnologyName, Technology> = {
        [TechnologyName.Pottery]: TechnologyRepository.create(TechnologyName.Pottery),
        [TechnologyName.AnimalHusbandry]: TechnologyRepository.create(TechnologyName.AnimalHusbandry),
        [TechnologyName.Hunting]: TechnologyRepository.create(TechnologyName.Hunting),
        [TechnologyName.Plough]: TechnologyRepository.create(TechnologyName.Plough),
        [TechnologyName.AdvancedWriting]: TechnologyRepository.create(TechnologyName.AdvancedWriting),
        [TechnologyName.Fishing]: TechnologyRepository.create(TechnologyName.Fishing),
        [TechnologyName.Archery]: TechnologyRepository.create(TechnologyName.Archery),
        [TechnologyName.OrganizedArmy]: TechnologyRepository.create(TechnologyName.OrganizedArmy),
        [TechnologyName.MusicalInstruments]: TechnologyRepository.create(TechnologyName.MusicalInstruments),
        [TechnologyName.BronzeWeapons]: TechnologyRepository.create(TechnologyName.BronzeWeapons),
        [TechnologyName.Idols]: TechnologyRepository.create(TechnologyName.Idols),
        [TechnologyName.Poetry]: TechnologyRepository.create(TechnologyName.Poetry),
        [TechnologyName.Calendar]: TechnologyRepository.create(TechnologyName.Calendar),
        [TechnologyName.PrimitiveWriting]: TechnologyRepository.create(TechnologyName.PrimitiveWriting),
        [TechnologyName.StoneWorking]: TechnologyRepository.create(TechnologyName.StoneWorking),
    }

    private static create(name: TechnologyName): Technology {
        return new Technology(
            name,
            TechnologyRepository._techs[name].description,
            TechnologyRepository._techs[name].prerequisites,
        )
    }

    public getAll(): Record<TechnologyName, Technology> {
        return super.getAll()
    }

    /**
     * This is hardcoded because I failed to write a graph algorithm
     */
    private static buildTechnologyTree(): Record<string, any> {
        return {
            [TechnologyName.AnimalHusbandry]: {},
            [TechnologyName.Archery]: {},
            [TechnologyName.Fishing]: {},
            [TechnologyName.Hunting]: {},
            [TechnologyName.MusicalInstruments]: {},
            [TechnologyName.Poetry]: {},
            [TechnologyName.StoneWorking]: {
                [TechnologyName.Idols]: {},
                [TechnologyName.BronzeWeapons]: {
                    [TechnologyName.OrganizedArmy]: {},
                },
            },
            [TechnologyName.Pottery]: {
                [TechnologyName.PrimitiveWriting]: {
                    [TechnologyName.AdvancedWriting]: {},
                    [TechnologyName.Calendar]: {
                        [TechnologyName.Plough]: {},
                    },
                },
            },
        }
    }
}

export default TechnologyRepository
