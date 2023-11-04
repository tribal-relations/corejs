import { singleton } from 'tsyringe'
import DiceThrower from './DiceThrower'

@singleton()
class SpecificDiceThrower extends DiceThrower {
    static target: number = 6

    public d6(): number {
        return SpecificDiceThrower.target
    }
}

export default SpecificDiceThrower
