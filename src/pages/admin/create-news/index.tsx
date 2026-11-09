import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import type { JSONContent } from "@tiptap/core";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageDropzone } from "@/components/image-upload/ImageDropzone";
import { newsSchema, type NewsFormValues } from "@/schemas/news";
import RichTextEditor from "@/components/rich-text-editor";
import { NewsJsonPreview } from "./partials/json-preview";

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function CreateNews() {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      content: emptyDocument,
    },
  });

  const [submittedData, setSubmittedData] = useState<Record<
    string,
    unknown
  > | null>(null);

  const onSubmit = (data: NewsFormValues) => {
    const output = {
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
        ? {
            name: data.thumbnail.name,
            type: data.thumbnail.type,
            size: data.thumbnail.size,
            lastModified: data.thumbnail.lastModified,
          }
        : null,
      content: data.content,
    };

    setSubmittedData(output);
  };

  const resetForm = () => {
    form.reset();
    setSubmittedData(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create News Article</CardTitle>
          <CardDescription>
            Publish a new story with a cover image and rich content.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="news-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter a headline"
                    />
                    <FieldDescription>
                      Use a clear, descriptive title for the article.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      aria-invalid={fieldState.invalid}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                      placeholder="Write a short summary for the article"
                    />
                    <FieldDescription>
                      A brief summary that appears before the main content.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="thumbnail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cover image</FieldLabel>
                    <ImageDropzone
                      value={field.value ?? null}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                    <FieldDescription>
                      Accepted formats: JPG, PNG, WEBP, GIF. Maximum size: 5 MB.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Content</FieldLabel>
                    <RichTextEditor
                      content={field.value ?? emptyDocument}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      invalid={fieldState.invalid}
                      placeholder="Tell me what you're thinking..."
                    />
                    <FieldDescription>
                      Write the article body with headings, lists, links, and
                      media.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="justify-between gap-3">
          <Button type="button" variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" form="news-form">
            Publish Article
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Data</CardTitle>
          <CardDescription>
            Only appears after a successful submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewsJsonPreview data={submittedData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateNews;
