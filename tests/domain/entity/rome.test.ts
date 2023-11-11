import 'reflect-metadata'
import { container } from 'tsyringe'
import Rome from '../../../src/domain/entity/Rome'

test('rome is created with correct default data', () => {
    const rome = container.resolve(Rome)

    expect(rome.radius).toBe(0)
    expect(rome.wealth).toBe(0)
    expect(rome.points).toBe(0)
    expect(rome.total).toBe(100)
    expect(rome.combatReadiness).toBe(50)
    expect(rome.civilizedness).toBe(50)

    expect(rome.tiles.length).toBe(0)
    expect(rome.food).toBe(0)
    expect(rome.culture).toBe(0)
    expect(rome.production).toBe(0)
    expect(rome.tradingAbility).toBe(0)
    expect(rome.technologies).toStrictEqual({})
})
