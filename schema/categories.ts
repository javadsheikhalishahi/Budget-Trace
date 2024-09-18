import { z } from "zod";

// Create Category Schema
export const CreateCategorySchema = z.object({
  name: z.string().min(4).max(20),
  icon: z.string().max(20),
  type: z.enum(["income", "expense"]),
});

// Type for Create Category Schema
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

// Delete Category Schema
export const DeleteCategorySchema = z.object({
  name: z.string().min(4).max(20),
  type: z.enum(["income", "expense"]),
});

// Type for Delete Category Schema
export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
