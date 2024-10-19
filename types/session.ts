import { z } from 'zod';

export const sessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  role: z.enum(['student', 'teacher']),
});
export type TSession = z.infer<typeof sessionSchema>;
