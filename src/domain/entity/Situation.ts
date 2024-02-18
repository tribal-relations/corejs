import type EntityInterface from './EntityInterface.ts'
import type SituationName from '../enum/SituationName.ts'

class Situation implements EntityInterface {
    Name: SituationName
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _quantity: number,
    ) {
    }
}

export default Situation
