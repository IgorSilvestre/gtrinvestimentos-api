import { z } from 'zod'

const numberValidation = z.number()
type Znumber = z.infer<typeof numberValidation>

export function sum(a: Znumber, b: Znumber) {
  const result = numberValidation.safeParse(a)
  if (!result.success) {
    // handle error then return
    console.log('GOT ERROR>>>', result.error.errors[0].message)
		return result.error.errors[0].message
  } else {
    // do something
    console.log(result.data)
		return a + b
  }
}
sum('2', 2) // ERROR
sum(2, 2) // SUCCESS
