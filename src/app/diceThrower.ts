import { singleton } from 'tsyringe'

@singleton()
class DiceThrower {
    sides = 6

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
        return this.randomIntegerIncluding(1, this.sides)
    }

    private randomIntegerIncluding(min: number, max: number): number {
        const rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    }
}

export default DiceThrower
