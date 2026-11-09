import type { JSONContent } from "@tiptap/core";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const hasMeaningfulText = (node: JSONContent | undefined): boolean => {
  if (!node || typeof node !== "object") {
    return false;
  }

  if (node.type === "image") {
    return Boolean(node.attrs?.src);
  }

  if (typeof node.text === "string" && node.text.trim().length > 0) {
    return true;
  }

  if (Array.isArray(node.content)) {
    return node.content.some((child) => hasMeaningfulText(child));
  }

  return false;
};

const contentSchema = z.custom<JSONContent>(
  (value) => {
    if (!value || typeof value !== "object") {
      return false;
    }

    const document = value as JSONContent;

    if (document.type !== "doc") {
      return false;
    }

    const content = Array.isArray(document.content) ? document.content : [];

    if (!content.length) {
      return false;
    }

    return content.some((node) => hasMeaningfulText(node));
  },
  {
    message:
      "News content is required and must contain meaningful text or media.",
  },
);

const thumbnailSchema = z
  .custom<File>((value) => value instanceof File, {
    message: "A cover image is required.",
  })
  .refine((file) => file.size > 0, {
    message: "A cover image is required.",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only JPEG, PNG, WebP, and GIF files are allowed.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Cover image must be 5 MB or smaller.",
  });

export const newsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters long.")
    .max(255, "Title must be 255 characters or fewer."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long.")
    .max(500, "Description must be 500 characters or fewer."),
  thumbnail: thumbnailSchema,
  content: contentSchema,
});

export type NewsFormValues = z.infer<typeof newsSchema>;
