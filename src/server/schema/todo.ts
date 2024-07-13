import { boolean, z as schema } from "zod";

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  // .datetime()
  date: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  // .boolean()
  done: schema.boolean(),
});

export type Todo = schema.infer<typeof TodoSchema>;
