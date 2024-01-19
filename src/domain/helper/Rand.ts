class Rand {
    public static randInt(min: number, maxIncluding: number): number {
        const rand = min + Math.random() * (maxIncluding + 1 - min)
        return Math.floor(rand)
    }

    public static chooseOneFromEnum(collection: any): any {
        return Rand.choice((Object as any).values(collection))
    }

    public static chooseManyWithoutRepeatsFromEnum(collection: any, length): any[] {
        const enumLength = Object.values(collection).length
        if (enumLength < length) {
            throw new Error(`Cannot choose ${length} values without repeats from enum with length ${enumLength}.`)
        }
        const values: any[] = []
        let value: any

        for (let i = 0; i < length;) {
            value = Rand.chooseOneFromEnum(collection)
            if (!values.includes(value)) {
                values.push((value))
                ++i
            }
        }

        return values
    }

    public static choice<T>(collection: T[]): T {
        const randomIndex = Rand.randInt(0, collection.length - 1)

        return collection[randomIndex]
    }

    public static choiceUntyped(collection: any[]): any {
        const randomIndex = Rand.randInt(0, collection.length - 1)

        return collection[randomIndex]
    }
}

export default Rand
