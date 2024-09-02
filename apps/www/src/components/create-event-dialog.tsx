"use client";

import { type FieldMetadata, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@lemonade-stand/ui";
import type { ComponentProps, ReactNode } from "react";
import { useFormState } from "react-dom";
import { createEventAction } from "~/server/calendar/actions";
import { createEventSchema } from "~/server/dto/create-event.dto";
import { DateTimeField } from "./form/date-time-field";

interface CreateEventDialog {
  children: React.ReactNode;
}

export function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-[0.8rem] font-medium text-destructive">{children}</p>;
}

export function InputField({
  field,
  type,
  ...props
}: {
  field: FieldMetadata<string>;
  type: Parameters<typeof getInputProps>[1]["type"];
} & ComponentProps<typeof Input>) {
  return <Input {...getInputProps(field, { type, ariaAttributes: true })} {...props} />;
}

export function CreateEventDialog({ children }: CreateEventDialog) {
  const [_state, action] = useFormState(createEventAction, undefined);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createEventSchema });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Creates a new single or recurring event.</DialogDescription>
        </DialogHeader>

        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className="flex flex-col gap-4"
        >
          <Field>
            <Label htmlFor={fields.recurrence.id}>Title</Label>
            <InputField
              field={fields.title}
              type="text"
              className={fields.title.errors && "border-destructive focus-visible:ring-destructive"}
            />
            {fields.title.errors && <FieldError>{fields.title.errors}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor={fields.description.id}>Description</Label>
            <InputField field={fields.description} type="text" />
            {fields.description.errors && <FieldError>{fields.description.errors}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor={fields.start.id}>Start</Label>
            <DateTimeField field={fields.start} />
            {fields.start.errors && <FieldError>{fields.start.errors}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor={fields.end.id}>End</Label>
            <DateTimeField field={fields.end} />
            {fields.end.errors && <FieldError>{fields.end.errors}</FieldError>}
          </Field>

          <div className="flex justify-end pt-2">
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
