import DiceThrower from '../../src/domain/helper/DiceThrower.ts'


class SuccessfulDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number[]): boolean {
        return true
    }
}

export default SuccessfulDiceThrower
