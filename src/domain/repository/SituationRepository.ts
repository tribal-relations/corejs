import BaseRepository from './BaseRepository.ts'
import Situation from '../entity/Situation.ts'
import SituationName from '../enum/SituationName.ts'

class SituationRepository extends BaseRepository<Situation> {
    static situationsCount = 10
    private static readonly _situations: Record<SituationName, { name: SituationName, description: string, quantity: number }> = {
        Columbus: {
            name: SituationName.Columbus,
            description: 'Only you can discover new tiles next round',
            quantity: 2,
        },
        Vulnerability: {
            name: SituationName.Vulnerability,
            description: 'Rome is weaker 1000pts next round',
            quantity: 2,
        },
        Nothing: {
            name: SituationName.Nothing,
            description: 'Nothing happens',
            quantity: 10,
        },
        Flood: {
            name: SituationName.Flood,
            description: "Remove River tile. If you don't have one - remove one from the next player",
            quantity: 5,
        },
        Nessie: {
            name: SituationName.Nessie,
            description: "Remove Lake tile. If you don't have one - remove one from the next player",
            quantity: 1,
        },
        Desertification: {
            name: SituationName.Desertification,
            description: "Turn one Pasture tile into Desert. If you don't have one - do so with one from the next player",
            quantity: 2,
        },
        Blessing: {
            name: SituationName.Blessing,
            description: '+1 Action this round',
            quantity: 2,
        },
        'Divine Shield': {
            name: SituationName.DivineShield,
            description: 'You win every fight if defending',
            quantity: 2,
        },
        'Forest Fire': {
            name: SituationName.ForestFire,
            description: "Remove Forest tile. If you don't have one - remove one from the next player",
            quantity: 4,
        },
        Pacifism: {
            name: SituationName.Pacifism,
            description: 'Nobody can arm next round',
            quantity: 5,
        },
    }

    protected readonly instances: Record<SituationName, Situation> = {
        [SituationName.Columbus]: SituationRepository.create(SituationName.Columbus),
        [SituationName.Vulnerability]: SituationRepository.create(SituationName.Vulnerability),
        [SituationName.Nothing]: SituationRepository.create(SituationName.Nothing),
        [SituationName.Flood]: SituationRepository.create(SituationName.Flood),
        [SituationName.Nessie]: SituationRepository.create(SituationName.Nessie),
        [SituationName.Desertification]: SituationRepository.create(SituationName.Desertification),
        [SituationName.Blessing]: SituationRepository.create(SituationName.Blessing),
        [SituationName.DivineShield]: SituationRepository.create(SituationName.DivineShield),
        [SituationName.ForestFire]: SituationRepository.create(SituationName.ForestFire),
        [SituationName.Pacifism]: SituationRepository.create(SituationName.Pacifism),
    }

    public static create(name: SituationName): Situation {
        return new Situation(
            String(name),
            SituationRepository._situations[name].description,
            SituationRepository._situations[name].quantity,
        )
    }
}

export default SituationRepository
