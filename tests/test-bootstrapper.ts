import type Tribe from '../src/domain/entity/Tribe'
import TribeFactory from '../src/outer/factory/TribeFactory'

class TestBootstrapper {
    public static addFood(tribe: Tribe, amount: number = 1): void {
        TribeFactory.addFood(tribe, amount)
    }

    public static addCulture(tribe: Tribe, amount: number = 1): void {
        TribeFactory.addCulture(tribe, amount)
    }

    public static addProduction(tribe: Tribe, amount: number = 1): void {
        TribeFactory.addProduction(tribe, amount)
    }
}

export default TestBootstrapper
