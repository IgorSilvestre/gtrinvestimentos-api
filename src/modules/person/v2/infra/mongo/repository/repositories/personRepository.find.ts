import { personModel } from "../../../../../v1/infra/mongo/personSchema"

export async function find(params: any) {
    const { tags } = params

  try {
    if (tags) params.tags = { $all: tags }

    const people = await personModel
      .find(params)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('company')

    return people
  } catch (err) {
    throw new Error(err as string)
  }
}
