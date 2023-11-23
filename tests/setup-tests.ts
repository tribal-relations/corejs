import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import MockStd from './mock/MockStd.ts'
import Std from '../src/ui/Std.ts'

global.beforeEach(() => {
    container.clearInstances()
    container.register<Std>(Std, { useClass: MockStd }, { lifecycle: Lifecycle.Singleton })
})
