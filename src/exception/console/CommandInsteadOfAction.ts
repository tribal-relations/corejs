class CommandInsteadOfAction extends Error {
    constructor() {
        super('You have entered a command (not an action). It is still your turn.')
    }
}

export default CommandInsteadOfAction
