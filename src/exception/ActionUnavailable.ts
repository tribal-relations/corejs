import AppException from './AppException.ts'

class ActionUnavailable extends AppException {
    constructor(tribeName: string, actionName: string, constraint: string | null = null) {
        if (constraint) {
            super(
                `Tribe '${tribeName}' cannot perform action '${actionName}', because it does not satisfy action constraints. (Insufficient ${constraint})`,
            )
        } else {
            super(`Tribe '${tribeName}' cannot perform action '${actionName}', because it does not satisfy action constraints.`)
        }
    }
}

export default ActionUnavailable
