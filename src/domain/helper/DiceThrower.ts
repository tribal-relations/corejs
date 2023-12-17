import { singleton } from 'tsyringe'
import Rand from './Rand.ts'

@singleton()
class DiceThrower {
    sides = 6

    public d6(): number {
        return this.throwDice()
    }

    public ifSuccessD6(successSides: number): boolean {
        return this.ifSuccessD6Manual([...Array(successSides).keys()])
    }

    private ifSuccessD6Manual(successSides: number[]): boolean {
        const diceResult = this.throwDice()
        for (let i = 0; i < successSides.length; i++) {
            if (successSides[i] === diceResult) {
                return true
            }
        }
        return false
    }

    private throwDice(): number {
        return Rand.randint(1, this.sides)
    }
}

export default DiceThrower
