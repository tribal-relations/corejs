import Population from "./population";

const situations = {
    "Columbus": {
        "name": "Columbus",
        "description": "Only you can discover new tiles next round",
        "quantity": 2
    },
    "Vulnerability": {
        "name": "Vulnerability",
        "description": "Rome is weaker 1000pts next round",
        "quantity": 2
    },
    "Nothing": {
        "name": "Nothing",
        "description": "Nothing happens",
        "quantity": 10
    },
    "Flood": {
        "name": "Flood",
        "description": "Remove River tile. If you don't have one - remove one from the next player",
        "quantity": 5
    },
    "Nessie": {
        "name": "Nessie",
        "description": "Remove Lake tile. If you don't have one - remove one from the next player",
        "quantity": 1
    },
    "Desertification": {
        "name": "Desertification",
        "description": "Turn one Pasture tile into Desert. If you don't have one - do so with one from the next player",
        "quantity": 2
    },
    "Blessing": {
        "name": "Blessing",
        "description": "+1 Action this round",
        "quantity": 2
    },
    "Divine Shield": {
        "name": "Divine Shield",
        "description": "You win every fight if defending",
        "quantity": 2
    },
    "Forest Fire": {
        "name": "Forest Fire",
        "description": "Remove Forest tile. If you don't have one - remove one from the next player",
        "quantity": 4
    },
    "Pacifism": {
        "name": "Pacifism",
        "description": "Nobody can arm next round",
        "quantity": 5
    }
}

class Situation {
    static situationsCount = 10
    static situationNameForestFire = "Forest Fire"
    static situationNameFlood = "Flood"
    static situationNameNessie = "Nessie"
    static situationNameBlessing = "Blessing"
    static situationNameDesertification = "Desertification"
    static situationNameDivineShield = "Divine Shield"
    static situationNamePacifism = "Pacifism"
    static situationNameColumbus = "Columbus"
    static situationNamePoliticalInstablility = "Vulnerability"
    static situationNameNothing = "Nothing"

    static situationNames = [
        Situation.situationNameForestFire,
        Situation.situationNameFlood,
        Situation.situationNameNessie,
        Situation.situationNameBlessing,
        Situation.situationNameDesertification,
        Situation.situationNameDivineShield,
        Situation.situationNamePacifism,
        Situation.situationNameColumbus,
        Situation.situationNamePoliticalInstablility,
        Situation.situationNameNothing,
    ]

    public static createFromName(name: string): Situation {
        return new Situation(name, situations[name].description, situations[name].quantity)
    }

    constructor(
        private name: string,
        private description: string,
        private quantity: number,
    ) {
    }
}

export default Situation
