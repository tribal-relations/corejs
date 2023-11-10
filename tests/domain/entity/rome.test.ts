import 'reflect-metadata'
import { container } from 'tsyringe'
import Rome from '../../../src/domain/entity/Rome'

test('rome is created with correct default data', () => {
    const rome = container.resolve(Rome)

    expect(rome.radius).toBe(0)
    expect(rome.wealth).toBe(0)
    expect(rome.points).toBe(0)
    expect(rome.population.total).toBe(100)
    expect(rome.population.combatReadiness).toBe(50)
    expect(rome.population.civilizedness).toBe(50)

    expect(rome.territory.tiles.length).toBe(0)
    expect(rome.food).toBe(0)
    expect(rome.territory.culture).toBe(0)
    expect(rome.territory.production).toBe(0)
    expect(rome.territory.tradingAbility).toBe(0)
    expect(rome.technologies).toStrictEqual({})
})
