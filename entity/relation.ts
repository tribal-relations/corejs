import Population from "./population";

const relations = {
    "Equals": {
        "name": "Equals",
        "agent_bonus": 0,
        "recipient_bonus": 0
    },
    "Respectable": {
        "name": "Respectable",
        "agent_bonus": 1,
        "recipient_bonus": 2
    },
    "Proteges": {
        "name": "Proteges",
        "agent_bonus": 1,
        "recipient_bonus": 4
    },
    "KnowItAlls": {
        "name": "KnowItAlls",
        "agent_bonus": 1,
        "recipient_bonus": -1
    },
    "Barbarians": {
        "name": "Barbarians",
        "agent_bonus": 1,
        "recipient_bonus": -2
    },
    "Rogues": {
        "name": "Rogues",
        "agent_bonus": 2,
        "recipient_bonus": -1
    },
    "Bourgeois": {
        "name": "Bourgeois",
        "agent_bonus": 2,
        "recipient_bonus": 0
    },
    "Mates": {
        "name": "Mates",
        "agent_bonus": 2,
        "recipient_bonus": 2
    },
    "Idols": {
        "name": "Idols",
        "agent_bonus": 3,
        "recipient_bonus": 2
    },
    "Cannibals": {
        "name": "Cannibals",
        "agent_bonus": 0,
        "recipient_bonus": -3
    }
}

class Relation {
    static relationsCount = 10

    static relationNameCannibals = "Cannibals"
    static relationNameBarbarians = "Barbarians"
    static relationNameRogues = "Rogues"
    static relationNameBourgeois = "Bourgeois"
    static relationNameKnowItAlls = "KnowItAlls"
    static relationNameEquals = "Equals"
    static relationNameRespectable = "Respectable"
    static relationNameMates = "Mates"
    static relationNameProteges = "Proteges"
    static relationNameIdols = "Idols"

    static relationNames = [
        "Cannibals",
        "Barbarians",
        "Rogues",
        "Bourgeois",
        "KnowItAlls",
        "Equals",
        "Respectable",
        "Mates",
        "Proteges",
        "Idols",
    ]

    constructor(
        private name: string,
        private agentBonus: number,
        private recipientBonus: number,
    ) {
    }

    public static createFromName(name: string): Relation {
        return new Relation(name, relations[name].agent_bonus, relations[name].recipient_bonus)
    }
}

export default Relation
