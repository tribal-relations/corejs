import 'reflect-metadata'
import { container } from 'tsyringe'
import MockStd from './mock/MockStd'
import Std from '../src/ui/Std'

global.beforeEach(() => {
    container.clearInstances()
    container.register<Std>(Std, MockStd)
})
