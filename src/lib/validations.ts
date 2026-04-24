import { z } from "zod";

export const createSimpleRetroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  team_id: z.string().optional(),
});

export type CreateSimpleRetroFormValues = z.infer<typeof createSimpleRetroSchema>;

export const createRetroSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    timeline_start: z.string().min(1, "Start date & time is required"),
    timeline_end: z.string().min(1, "End date & time is required"),
    project_id: z.string().optional(),
    team_id: z.string().optional(),
    questions: z
      .array(
        z.object({
          text: z.string().min(1, "Question text cannot be empty"),
        })
      )
      .min(1, "At least one question is required"),
  })
  .refine(
    (data) => {
      if (data.timeline_start && data.timeline_end) {
        return data.timeline_end >= data.timeline_start;
      }
      return true;
    },
    {
      message: "End date must be on or after start date",
      path: ["timeline_end"],
    }
  );

export type CreateRetroFormValues = z.infer<typeof createRetroSchema>;

export const addResponseSchema = z.object({
  text: z.string().min(1, "Response text is required"),
  sentiment: z.number().min(1).max(5).optional().nullable(),
  is_action_item: z.boolean().default(false),
});

export type AddResponseFormValues = z.infer<typeof addResponseSchema>;

export const createActionItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  owner_id: z.string().uuid().optional().nullable(),
  due_date: z.string().optional().nullable(),
});

export type CreateActionItemFormValues = z.infer<typeof createActionItemSchema>;

export const addTimelineEntrySchema = z.object({
  entry_date: z.string().min(1, "Date is required"),
  entry_time: z.string().optional().default(""),
  description: z.string().min(1, "Description is required"),
});

export type AddTimelineEntryFormValues = z.infer<typeof addTimelineEntrySchema>;
