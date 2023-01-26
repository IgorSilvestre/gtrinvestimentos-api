import { expect, it, test } from 'vitest'
import { sum } from '.'

test('index.ts sum function', () => {
    it('tests function with correct inputs types', () => {
        expect(sum(4, 4)).toBe(8)
    })
    it('testes function with wrong input types', () => {
        expect(sum('2', 2)).toEqual('Expected number, received string')
        
    })
})