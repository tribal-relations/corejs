import consoleReporter from './console-reporter.ts'
import coreReporter from './core-reporter.ts'
import webReporter from './web-reporter.ts'

export default (folder) => {
    switch (folder) {
        case 'ui/web':
            return webReporter
        case 'ui/console':
            return consoleReporter
        default:
            return coreReporter
    }
}
