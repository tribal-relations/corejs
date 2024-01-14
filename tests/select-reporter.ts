import consoleReporter from './console-reporter'
import coreReporter from './core-reporter'
import webReporter from './web-reporter'

export default (folder) => {
    switch (folder) {
        case 'ui/browser':
            return webReporter
        case 'ui/console':
            return consoleReporter
        default:
            return coreReporter
    }
}
