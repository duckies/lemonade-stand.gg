import * as v from "valibot";

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

export const isSlug = v.custom<string>((input) =>
  typeof input === "string" ? /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input) : false,
);