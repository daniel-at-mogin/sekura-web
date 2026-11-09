import type { JSONContent } from "@tiptap/core";

export type NewsFormState = {
  title: string;
  description: string;
  thumbnail?: File;
  content: JSONContent;
};

export type NewsSubmission = {
  title: string;
  description: string;
  thumbnail: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
  } | null;
  content: JSONContent;
};
