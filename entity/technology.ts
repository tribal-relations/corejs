const techs = {
    "Pottery": {
        "name": "Pottery",
        "description": "Harvest result +2",
        "prerequisites": {}
    },
    "Animal Husbandry": {
        "name": "Animal Husbandry",
        "description": "Pasture +2 Food",
        "prerequisites": {}
    },
    "Hunting": {
        "name": "Hunting",
        "description": "Forest +1 Food",
        "prerequisites": {}
    },
    "Plough": {
        "name": "Plough",
        "description": "Harvest result +2. Throw 2 dice if Animal Husbandry is discovered",
        "prerequisites": {
            "Calendar": true
        }
    },
    "Advanced Writing": {
        "name": "Advanced Writing",
        "description": "Culture *2",
        "prerequisites": {
            "Primitive Writing": true
        }
    },
    "Fishing": {
        "name": "Fishing",
        "description": "River and Lake +2 Food",
        "prerequisites": {}
    },
    "Archery": {
        "name": "Archery",
        "description": "Combat Readiness *2",
        "prerequisites": {}
    },
    "Organized Army": {
        "name": "Organized Army",
        "description": "Combat Readiness *3",
        "prerequisites": {
            "Bronze Weapons": true
        }
    },
    "Musical Instruments": {
        "name": "Musical Instruments",
        "description": "Culture *2",
        "prerequisites": {}
    },
    "Bronze Weapons": {
        "name": "Bronze Weapons",
        "description": "Metal +1 Wealth +1 Production. Combat Readiness *2",
        "prerequisites": {
            "Stone Working": true
        }
    },
    "Idols": {
        "name": "Idols",
        "description": "Stone +2 Culture",
        "prerequisites": {
            "Stone Working": true
        }
    },
    "Poetry": {
        "name": "Poetry",
        "description": "Culture *2",
        "prerequisites": {}
    },
    "Calendar": {
        "name": "Calendar",
        "description": "Food *2",
        "prerequisites": {
            "Primitive Writing": true
        }
    },
    "Primitive Writing": {
        "name": "Primitive Writing",
        "description": "Wealth +3",
        "prerequisites": {
            "Pottery": true
        }
    },
    "Stone Working": {
        "name": "Stone Working",
        "description": "Stone +2 Production +1 Culture",
        "prerequisites": {}
    }
}

class Technology {
    static technologiesCount = 15

    static technologyNamePlough = "Plough"
    static technologyNamePrimitiveWriting = "Primitive Writing"
    static technologyNameAdvancedWriting = "Advanced Writing"
    static technologyNameBronzeWeapons = "Bronze Weapons"
    static technologyNameStoneWorking = "Stone Working"
    static technologyNameIdols = "Idols"
    static technologyNamePottery = "Pottery"
    static technologyNameAnimalHusbandry = "Animal Husbandry"
    static technologyNameHunting = "Hunting"
    static technologyNameArchery = "Archery"
    static technologyNameOrganizedArmy = "Organized Army"
    static technologyNameFishing = "Fishing"
    static technologyNameMusicalInstruments = "Musical Instruments"
    static technologyNamePoetry = "Poetry"
    static technologyNameCalendar = "Calendar"

    static TechnologyNames = [
        Technology.technologyNamePlough,
        Technology.technologyNamePrimitiveWriting,
        Technology.technologyNameAdvancedWriting,
        Technology.technologyNameBronzeWeapons,
        Technology.technologyNameStoneWorking,
        Technology.technologyNameIdols,
        Technology.technologyNamePottery,
        Technology.technologyNameAnimalHusbandry,
        Technology.technologyNameHunting,
        Technology.technologyNameArchery,
        Technology.technologyNameOrganizedArmy,
        Technology.technologyNameFishing,
        Technology.technologyNameMusicalInstruments,
        Technology.technologyNamePoetry,
        Technology.technologyNameCalendar,
    ]

    constructor(
        private name: string,
        private description: string,
        private prerequisites: object,
    ) {
    }

    public static createFromName(name: string): Technology {
        return new Technology(name, techs[name].description, techs[name].prerequisites)
    }
}


