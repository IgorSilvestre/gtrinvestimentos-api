import { regexForSearch } from 'br-lib'
import { AppError } from '../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../shared/keys/errorMessageKeys'
import { TagRepository } from '../../../../tag/infra/mongo/repository/TagRepository'
import { ZPersonModel } from '../../../v1/infra/mongo/personSchema'
import { PersonRepository_v2 } from '../../infra/mongo/repository/PersonRepository'

export async function getPartners(): Promise<ZPersonModel[] | AppError> {
    let partnerTagId
    try {
        partnerTagId = await TagRepository.find({ label: regexForSearch('parceiro') })

        if (partnerTagId === null || partnerTagId.length === 0)
            return new AppError(
                { clientMessage: errorMessageKeys.tag.notFound },
                404,
            )
    }
    catch (err) {
        return new AppError(
            { clientMessage: errorMessageKeys.tag.notFound, apiError: err },
            404,
        )
    }

    try {
        const people: ZPersonModel[] | null = await PersonRepository_v2.find(
            { tags: partnerTagId[0]._id }
        )

        if (people === null)
            return new AppError(
                { clientMessage: errorMessageKeys.person.notFound },
                404,
            )
        console.log(people)
        return people as ZPersonModel[]
    } catch (err) {
        return new AppError(
            { clientMessage: errorMessageKeys.person.notFound, apiError: err },
            404,
        )
    }
}

