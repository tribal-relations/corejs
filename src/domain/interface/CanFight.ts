interface CanFight {
    get militaryPower(): number

    takeLosses: (amount: number) => void
}

export default CanFight
