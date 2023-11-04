class Rand {
    public static randint(min: number, max: number): number {
        const rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    }

    public static enumChoice(collection: any): any {
        return Rand.choice((Object as any).values(collection))
    }

    public static choice<T>(collection: T[]): T {
        const randomIndex = Rand.randint(0, collection.length - 1)

        return collection[randomIndex]
    }

    public static choiceUntyped(collection: any[]): any {
        const randomIndex = Rand.randint(0, collection.length - 1)

        return collection[randomIndex]
    }
}
export default Rand
