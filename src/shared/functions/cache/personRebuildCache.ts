import { PersonRepository } from "../../../modules/person/infra/mongo/repository/PersonRepository"
import { CACHE } from "../../cache"
import { cacheKeys } from "../../keys/cacheKeys"
import { CacheTime } from "../../keys/cacheTime"


/**
 * @returns True if cache was rebuilded, false if not
 */
export async function personRebuildCache () {
    const allPeople = await PersonRepository.getAll()

    if (!allPeople) return false

    CACHE.set(cacheKeys.person.all, allPeople, CacheTime.one_week)
    return true
}