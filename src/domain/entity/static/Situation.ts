import type SituationName from '../../enum/SituationName.ts'
import type EntityInterface from '../EntityInterface.ts'

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
