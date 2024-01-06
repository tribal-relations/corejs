import { beforeEach } from 'vitest'
import MockStd from './mock/MockStd.ts'
import SpecificDiceThrower from './mock/SpecificDiceThrower'
import TestBootstrapper from './test-bootstrapper'
import DiceThrower from '../src/domain/helper/DiceThrower'
import Std from '../src/ui/console/Std.ts'

beforeEach(() => {
    TestBootstrapper.addMocks([
        { class: DiceThrower, instance: new SpecificDiceThrower() },
        { class: Std, instance: new MockStd() },
    ])
})
