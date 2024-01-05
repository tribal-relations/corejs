import {container} from '../src/NaiveDiContainer.ts'
import MockStd from './mock/MockStd.ts'
import type Tribe from '../src/domain/entity/Tribe.ts'
import TribeFactory from '../src/outer/factory/TribeFactory.ts'
import Std from '../src/ui/Std.ts'

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

    public static getContainerWithMockStd() {
        container.clearInstances()
        container.setMock(Std, new MockStd())
        container.rebuildMap()

        return container
    }

    public static addMocks(mocks: Array<object>) {
        container.clearInstances()
        for (let index in mocks) {
            container.setMock(mocks[index].class, mocks[index].instance)
        }
        container.rebuildMap()

        return container
    }
}

export default TestBootstrapper
