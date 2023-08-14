import { ObjectId } from 'mongodb'
import { ensureArray } from './ensureArray'

export function converStringToObjectIdMongo (elements: string | string[]): ObjectId[] {
    const elementsArr = ensureArray(elements)
    return elementsArr.map((element: string) => new ObjectId(element))
    // return { $addToSet: { $each: objectIds } }
}
