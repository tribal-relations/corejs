import { container, type DependencyContainer } from 'tsyringe'
import MockStd from './mock/MockStd'
import type Tribe from '../src/domain/entity/Tribe'
import TribeFactory from '../src/outer/factory/TribeFactory'
import Std from '../src/ui/Std'

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

    public static getContainerWithMockStd(): DependencyContainer {
        return container
            .createChildContainer()
            .register<Std>(Std, MockStd)
    }

    public static addMockStd(cont: DependencyContainer): DependencyContainer {
        return cont
            .register<Std>(Std, MockStd)
    }
}

export default TestBootstrapper
