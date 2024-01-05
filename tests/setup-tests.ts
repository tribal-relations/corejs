import { container } from '../src/NaiveDiContainer.ts'
import MockStd from './mock/MockStd.ts'
import Std from '../src/ui/Std.ts'
import TestBootstrapper from "./test-bootstrapper";
import DiceThrower from "../src/domain/helper/DiceThrower";
import SpecificDiceThrower from "./mock/SpecificDiceThrower";

global.beforeEach(() => {
    TestBootstrapper.addMocks([
        {class: DiceThrower, instance: new SpecificDiceThrower()},
        {class: Std, instance: new MockStd()},
    ])
})
