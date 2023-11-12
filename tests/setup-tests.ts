import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import MockStd from './mock/MockStd'
import Std from '../src/ui/Std'

global.beforeEach(() => {
    container.clearInstances()
    container.register<Std>(Std, { useClass: MockStd }, { lifecycle: Lifecycle.Singleton })
})
