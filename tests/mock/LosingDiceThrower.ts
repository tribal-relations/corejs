import { singleton } from 'tsyringe'
import DiceThrower from '../../src/domain/helper/DiceThrower.ts'

@singleton()
class LosingDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return false
    }
}

export default LosingDiceThrower
