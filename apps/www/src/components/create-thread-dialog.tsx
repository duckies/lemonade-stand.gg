"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
} from "@repo/ui";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createThread, type GuildMember } from "~/server/discord";

const FormSchema = z.object({
  user: z.string(),
});

export function CreateThreadDialog({ members }: { members: GuildMember[] }) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const users = members.map((m) => ({
    id: m.user.id,
    name: m.nick || m.user.global_name || m.user.username,
    keywords: [m.nick, m.user.global_name, m.user.username].filter(Boolean) as string[],
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      createThread("1166616543749218375", { name: users.find((u) => u.id === data.user)?.name || "Unknown" });
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Trial Thread</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Trial Thread</DialogTitle>
          <DialogDescription>Creates a new trial thread for a person in the Discord.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>User</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? users.find((user) => user.id === field.value)?.name : "Select user..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search users..." className="h-9" />
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup heading="Users">
                            {users.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.id}
                                keywords={user.keywords}
                                onSelect={() => {
                                  form.setValue("user", user.id);
                                  setOpen(false);
                                }}
                              >
                                {user.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === user.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The user to create a new trial thread for.</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
