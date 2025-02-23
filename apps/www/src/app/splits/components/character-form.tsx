"use client";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@lemonade-stand/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Check, LucideChevronDown, LucideLoader, LucideTrash2 } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { toast } from "sonner";
import { useAuth, useUserResponse } from "~/app/splits/atoms";
import { realms } from "~/constants";

interface CharacterSelection {
  name: string;
  realm: string;
}

type CharacterSelectionProps = {
  children: ReactNode;
};

export function CharacterForm() {
  const { user, token } = useAuth();
  const { data: response, isLoading } = useUserResponse(user?.id);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      main: response?.main ?? { name: "", realm: "illidan" },
      alts: response?.alts ?? [{ name: "", realm: "illidan" }],
    },
    onSubmit: async ({ value }) => {
      const resp = await fetch("http://localhost:4000/responses", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });

      const data = await resp.json();

      if (resp.ok) {
        toast.success("Split Characters Updated");
      } else {
        toast.error("Failed to update split characters", {
          description: data.message || data.error || "Unknown error",
          duration: 5000,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-12 grid-rows-[1fr_auto] gap-5">
        <div className="relative mb-5 bg-card border border-border rounded-2xl px-6 pt-5 pb-8 grid grid-cols-12 lg:grid-cols-6 gap-2 col-span-4 self-start">
          <h3 className="absolute -top-3 left-3 font-serif font-semibold tracking-wider text-xl text-foreground">
            Main Character
          </h3>
          <form.Field
            name="main.name"
            validators={{
              onBlur: ({ value }) => (value === "" ? "Character name is required" : undefined),
            }}
          >
            {(field) => {
              return (
                <div className="col-span-6">
                  <Label htmlFor={field.name} className="text-primary/80">
                    Character Name
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Gretchen"
                  />
                  {field.state.meta.errors ? (
                    <p role="alert" className="text-sm ml-1 text-red-400 mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
          <form.Field
            name="main.realm"
            validators={{
              onChange: ({ value }) => (value === "" ? "Realm is required" : undefined),
            }}
          >
            {(field) => {
              return (
                <div className="col-span-6">
                  <Label htmlFor={field.name} className="text-primary/80">
                    Realm
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-10 flex w-full justify-between hover:bg-primary hover:text-primary-foreground",
                          !field.state.value && "text-muted-foreground",
                        )}
                      >
                        {field.state.value
                          ? realms.find((realm) => realm.slug === field.state.value)?.name
                          : "Select realm"}
                        <LucideChevronDown className="h-5 w-5 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search realms..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No realm found.</CommandEmpty>
                          <CommandGroup>
                            {realms.map((realm) => (
                              <CommandItem
                                value={realm.slug}
                                key={realm.slug}
                                onSelect={() => {
                                  field.handleChange(realm.slug);
                                }}
                              >
                                {realm.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    realm.slug === field.state.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {field.state.meta.errors ? (
                    <p role="alert" className="text-sm ml-1 text-red-400 mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
          <div className="flex flex-col gap-4 col-span-6 text-sm mt-2 text-muted-foreground">
            <p>This is the character you plan on raiding with in Liberation of Undermine.</p>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}
              children={([canSubmit, isSubmitting, isDirty]) => (
                <Button type="submit" disabled={!canSubmit || !isDirty}>
                  {isSubmitting ? (
                    <LucideLoader className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Changes"
                  )}
                </Button>
              )}
            />
          </div>
        </div>

        <div className="relative mb-5 bg-card border border-border rounded-2xl px-6 pt-5 pb-8 col-span-8">
          <h3 className="absolute -top-3 left-3 font-serif font-semibold tracking-wider text-xl text-foreground">
            Split Characters
          </h3>
          <form.Field name="alts" mode="array">
            {(field) => (
              <div className="">
                <div className="grid grid-cols-2 gap-3">
                  {field.state.value.map((_, i) => {
                    return (
                      <Fragment key={`alt-${i}`}>
                        <form.Field
                          name={`alts[${i}].name`}
                          validators={{
                            onBlur: ({ value }) =>
                              value === "" ? "Character name is required" : undefined,
                            onChange: ({ value }) =>
                              value === "" ? "Character name is required" : undefined,
                          }}
                        >
                          {(subField) => {
                            return (
                              <div className="">
                                <Label className="text-primary/80">Character Name</Label>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) => subField.handleChange(e.target.value)}
                                  placeholder="Character Name"
                                />
                                {subField.state.meta.errors ? (
                                  <p role="alert" className="text-sm ml-1 text-red-400 mt-2">
                                    {subField.state.meta.errors.join(", ")}
                                  </p>
                                ) : null}
                              </div>
                            );
                          }}
                        </form.Field>
                        <form.Field name={`alts[${i}].realm`}>
                          {(subField) => {
                            return (
                              <div className="">
                                <Label className="text-primary/80">Realm</Label>
                                <div className="flex gap-3">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "h-10 flex w-full justify-between hover:bg-primary hover:text-primary-foreground",
                                          !field.state.value && "text-muted-foreground",
                                        )}
                                      >
                                        {field.state.value
                                          ? realms.find(
                                              (realm) => realm.slug === subField.state.value,
                                            )?.name
                                          : "Select realm"}
                                        <LucideChevronDown className="h-5 w-5 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                      <Command>
                                        <CommandInput
                                          placeholder="Search realms..."
                                          className="h-9"
                                        />
                                        <CommandList>
                                          <CommandEmpty>No realm found.</CommandEmpty>
                                          <CommandGroup>
                                            {realms.map((realm) => (
                                              <CommandItem
                                                value={realm.slug}
                                                key={realm.slug}
                                                onSelect={() => {
                                                  subField.handleChange(realm.slug);
                                                }}
                                              >
                                                {realm.name}
                                                <Check
                                                  className={cn(
                                                    "ml-auto",
                                                    realm.slug === subField.state.value
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="self-end rounded-lg p-4 h-10 hover:bg-primary hover:text-primary-foreground"
                                    onClick={() => field.removeValue(i)}
                                  >
                                    <LucideTrash2 className="h-4 w-4 " />
                                  </Button>
                                </div>
                                {subField.state.meta.errors ? (
                                  <p role="alert" className="text-sm ml-1 text-red-400 mt-2">
                                    {subField.state.meta.errors.join(", ")}
                                  </p>
                                ) : null}
                              </div>
                            );
                          }}
                        </form.Field>
                      </Fragment>
                    );
                  })}
                </div>
                <Button
                  variant="default"
                  onClick={() => field.pushValue({ name: "", realm: "Illidan" })}
                  type="button"
                  className="mt-5 w-full"
                >
                  Add a split character
                </Button>
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </form>
  );
}
