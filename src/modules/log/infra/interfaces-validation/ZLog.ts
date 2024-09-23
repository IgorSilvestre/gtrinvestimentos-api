import { z } from "zod";

const logValidation = z.object({
  action: z.string().min(1, 'Action must not be empty'), // String and required
  timestamp: z.date().default(() => new Date()), // Date with default value
  body: z.object({}).optional(), // Optional object for request body
})

export type ZLog = z.infer<typeof logValidation>

