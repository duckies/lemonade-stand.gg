"use server";

import { parseWithZod } from "@conform-to/zod";
import { createEventSchema } from "../dto/create-event.dto";
import { createEvent } from "../rrule";

export async function createEventAction(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createEventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const event = await createEvent(submission.value);

  console.log("Event Created", event);

  return {
    status: "success",
    message: "Event created successfully",
  };
}
