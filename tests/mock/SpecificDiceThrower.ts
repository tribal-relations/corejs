import DiceThrower from '../../src/domain/helper/DiceThrower.ts'

class SpecificDiceThrower extends DiceThrower {
    static target: number = 6

    public d6(): number {
        return this.throwDice()
    }

    private throwDice(): number {
        return SpecificDiceThrower.target
    }
}

export default SpecificDiceThrower
