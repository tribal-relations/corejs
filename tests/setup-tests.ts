import 'reflect-metadata'
import { container } from 'tsyringe'

global.beforeEach(() => {
    // container.reset()
    container.clearInstances()
})
