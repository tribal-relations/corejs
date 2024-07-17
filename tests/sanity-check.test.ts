import { describe, expect, test } from 'vitest'

interface User {
    name: string
    age: number
}

function isUser(value: any): value is User {
    return typeof value === 'object' && 'name' in value && 'age' in value
}

describe('sanity check', () => {
    describe('User Type Guard', () => {
        test('should identify a valid User object', () => {
            const user: User = { name: 'Alice', age: 30 }
            expect(isUser(user)).toBe(true)
        })

        test('should not identify an invalid object as a User', () => {
            const invalid: any = { name: 'Bob' }
            expect(isUser(invalid)).toBe(false)
        })
    })

    test('strictNullChecks works', () => {
        // IDE helps but this code passes without errors from vitest :(

        let simpleInt: number = 1
        simpleInt = null

        console.log('simpleInt', simpleInt)
        expect(simpleInt === null).toBe(true)
    })
})
