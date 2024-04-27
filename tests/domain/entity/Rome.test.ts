import Rome from '../../../src/domain/entity/static/Rome.ts'
import { container } from '../../../src/NaiveDiContainer.ts'

test('rome is created with correct default data', () => {
    const rome = container.resolveSafely(Rome)

    expect(rome.radius).toBe(0)
    expect(rome.gold).toBe(0)
    expect(rome.points).toBe(0)
    expect(rome.population).toBe(100)
    expect(rome.militaryPower).toBe(50)
    expect(rome.civilizedness).toBe(50)

    expect(rome.tilesLength).toBe(0)
    expect(rome.food).toBe(0)
    expect(rome.culture).toBe(0)
    expect(rome.production).toBe(0)
    expect(rome.mercantility).toBe(0)
    expect(rome.technologies).toStrictEqual({})
})
